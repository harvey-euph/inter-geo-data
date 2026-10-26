#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Parse CLI arguments
const args = process.argv.slice(2);
let outputDir = path.join(REPO_ROOT, 'dist-index');
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out-dir' && args[i + 1]) {
    outputDir = path.resolve(process.cwd(), args[i + 1]);
    i++;
  }
}

console.log(`[build-indexes] Repo root: ${REPO_ROOT}`);
console.log(`[build-indexes] Output directory: ${outputDir}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// -------------------------------------------------------------
// Helper utilities
// -------------------------------------------------------------
function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (entry.isFile()) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function relPath(fullPath) {
  return path.relative(REPO_ROOT, fullPath).replace(/\\/g, '/');
}

// -------------------------------------------------------------
// 1. Build Info Cards Index (info/*.md)
// -------------------------------------------------------------
function buildInfoIndex() {
  const infoDir = path.join(REPO_ROOT, 'info');
  if (!fs.existsSync(infoDir)) {
    return { files: [], cards: [], targets: {} };
  }

  const mdFiles = fs.readdirSync(infoDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => path.join(infoDir, f));

  const allCards = [];
  const targetsMap = {};

  for (const filePath of mdFiles) {
    const relativeFile = relPath(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const sections = content.split(/^#\s+/m);

    // First section before any # heading is file-level preamble
    for (let sIdx = 1; sIdx < sections.length; sIdx++) {
      const section = sections[sIdx];
      const lines = section.split(/\r?\n/);
      const title = lines[0].trim();

      const meta = {};
      const bodyLines = [];
      let inMeta = true;

      for (let lIdx = 1; lIdx < lines.length; lIdx++) {
        const line = lines[lIdx];
        const trimmed = line.trim();

        // Meta bullets immediately follow the title: - key: value
        const metaMatch = inMeta && trimmed.match(/^-\s*([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
        if (metaMatch) {
          const key = metaMatch[1].toLowerCase();
          const val = metaMatch[2].trim();
          meta[key] = val;
        } else {
          // If we encounter a non-metadata bullet or content, stop parsing metadata
          if (trimmed.length > 0 && !trimmed.startsWith('<!--')) {
            inMeta = false;
            bodyLines.push(line);
          } else if (trimmed.startsWith('<!--')) {
            // Comments can be skipped
            continue;
          }
        }
      }

      // Parse targets list
      const rawTargetsStr = meta.targets || meta.target || '';
      const targets = rawTargetsStr
        ? rawTargetsStr
            .replace(/[\[\]]/g, '')
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
        : [];

      // Parse tags
      const rawTagsStr = meta.tags || '';
      const tags = rawTagsStr
        ? rawTagsStr.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
        : [];

      // Priority: strict integer 0..139 (default 140 if omitted)
      const priorityNum = meta.priority !== undefined && !isNaN(Number(meta.priority))
        ? Number(meta.priority)
        : 140;

      // Extract short preview from first content bullet if available
      let preview = '';
      for (const line of bodyLines) {
        const clean = line.replace(/^[-*]\s+/, '').trim();
        if (clean.length > 0) {
          preview = clean.replace(/[*_`#[\]]/g, '').slice(0, 120);
          break;
        }
      }

      const cardStub = {
        id: meta.id || `card-${path.basename(filePath, '.md')}-${sIdx}`,
        title,
        file: relativeFile,
        sectionIndex: sIdx - 1,
        targets,
        priority: priorityNum,
        icon: meta.icon || null,
        accent: meta.accent || meta.color || null,
        tags,
        type: meta.type || null,
        display: meta.display === 'false' ? false : true,
        comparison: meta.comparison
          ? meta.comparison.split(',').map((c) => c.trim()).filter(Boolean)
          : null,
        image: meta.image || null,
        imageSize: meta.imagesize || null,
        imagePosition: meta.imageposition || null,
        imageAlt: meta.imagealt || null,
        preview: preview || null
      };

      allCards.push(cardStub);

      // Invert targets index
      for (const target of targets) {
        const key = target.toUpperCase();
        if (!targetsMap[key]) targetsMap[key] = [];
        targetsMap[key].push(cardStub);

        // Also add direct key if casing is different (e.g. mixed-case names)
        if (target !== key) {
          if (!targetsMap[target]) targetsMap[target] = [];
          targetsMap[target].push(cardStub);
        }
      }
    }
  }

  // Sort each target's list strictly by priority ascending, then by order of appearance
  for (const key of Object.keys(targetsMap)) {
    targetsMap[key].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return 0; // Preserve reading/appearance order
    });
  }

  return {
    files: mdFiles.map(relPath),
    totalCards: allCards.length,
    cards: allCards,
    targets: targetsMap
  };
}

// -------------------------------------------------------------
// 2. Build Layers Index (layers/*.csv)
// -------------------------------------------------------------
function buildLayersIndex() {
  const layersDir = path.join(REPO_ROOT, 'layers');
  if (!fs.existsSync(layersDir)) {
    return { files: [], layers: [], byFilename: {}, byId: {} };
  }

  const csvFiles = walkDir(layersDir)
    .filter((f) => f.endsWith('.csv'))
    .sort();

  const layersList = [];
  const byFilename = {};
  const byId = {};

  for (const filePath of csvFiles) {
    const filename = path.basename(filePath);
    const relativeFile = relPath(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);

    const directives = {};
    const legendDirectives = [];
    let headerColumns = null;
    let dataRowCount = 0;
    const sampleTargets = new Set();

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (line.startsWith('//')) {
        const directiveMatch = line.match(/^\/\/\s*@([a-zA-Z0-9_-]+)\s*[:=]\s*(.*)$/);
        if (directiveMatch) {
          const key = directiveMatch[1];
          const val = directiveMatch[2].trim();
          if (key === 'legend') {
            const sep = val.includes(':') ? ':' : ',';
            const parts = val.split(sep);
            const color = parts[0].trim();
            const labelZh = parts.slice(1).join(sep).trim();
            legendDirectives.push({ key: color, color, labelZh });
          } else {
            directives[key] = val;
          }
        }
        continue;
      }

      // Non-comment line = header row or data row
      const rawCols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      const firstCol = rawCols[0];
      const normFirst = firstCol.toLowerCase().replace(/[\s_-]+/g, '');

      // Check for column header line
      if (!headerColumns && (
        normFirst === 'regionid' || normFirst === 'region' ||
        normFirst === 'iso2' || normFirst === 'id' || normFirst === 'key' || normFirst === 'code' ||
        rawCols.some((c) => ['color', 'value', 'label', 'namezh', 'examplepolecode'].includes(c.toLowerCase().replace(/[\s_-]+/g, '')))
      )) {
        headerColumns = rawCols;
        continue;
      }

      dataRowCount++;
      if (firstCol && firstCol.length < 30) {
        sampleTargets.add(firstCol);
      }
    }

    const id = directives.id || path.basename(filePath, '.csv');
    const orderNum = directives.order !== undefined && !isNaN(Number(directives.order))
      ? Number(directives.order)
      : 999;

    let group = directives.group;
    if (group === 'fill-region-with-color') {
      group = 'fill-region';
    }
    if (!group) {
      const parentDir = path.basename(path.dirname(filePath));
      if (parentDir === 'fill-region-with-color' || parentDir === 'fill-region') {
        group = 'fill-region';
      } else if (parentDir === 'ext-object') {
        group = 'ext-object';
      } else if (parentDir === 'global-label') {
        group = 'global-label';
      } else if (parentDir === 'area-label') {
        group = 'area-label';
      } else if ((directives.type || 'Text') === 'FillWithColor') {
        const isAllRegions = sampleTargets.size === 0 ||
          Array.from(sampleTargets).every((k) => /^[A-Z]{2}(::[A-Za-z0-9_-]+)*$/.test(k));
        group = isAllRegions ? 'fill-region' : 'ext-object';
      } else if ((directives.type || 'Text') === 'ExtObject') {
        group = 'ext-object';
      } else {
        if (directives.effectiveRange === 'International' || sampleTargets.size > 25) {
          group = 'global-label';
        } else {
          group = 'area-label';
        }
      }
    }

    const layerMeta = {
      id,
      filename,
      file: relativeFile,
      nameZh: directives.nameZh || filename,
      nameEn: directives.nameEn || filename,
      shortBadge: directives.shortBadge || null,
      type: directives.type || 'Text',
      group,
      order: orderNum,
      accentColor: directives.accentColor || directives['default-color'] || null,
      defaultColor: directives['default-color'] || directives.accentColor || null,
      descriptionZh: directives.descriptionZh || null,
      effectiveRange: directives.effectiveRange || null,
      loadedTiming: directives.loadedTiming || 'on-demand',
      focusTarget: directives.focusTarget || null,
      goto: directives.goto || null,
      fgb: directives.fgb || null,
      innerGrid: directives.innerGrid || null,
      legend: legendDirectives.length > 0 ? legendDirectives : null,
      columns: headerColumns || [],
      rowCount: dataRowCount,
      targetKeys: Array.from(sampleTargets)
    };

    layersList.push(layerMeta);
    byFilename[filename] = layerMeta;
    byId[id] = layerMeta;
  }

  // Sort by order ascending
  layersList.sort((a, b) => a.order - b.order);

  const groups = {
    fillRegion: layersList.filter((l) => l.group === 'fill-region'),
    extObject: layersList.filter((l) => l.group === 'ext-object'),
    globalLabel: layersList.filter((l) => l.group === 'global-label'),
    areaLabel: layersList.filter((l) => l.group === 'area-label')
  };

  return {
    files: csvFiles.map(relPath),
    totalLayers: layersList.length,
    groups,
    layers: layersList,
    byFilename,
    byId
  };
}

// -------------------------------------------------------------
// 3. Build Data Index (data/**/*.fgb)
// -------------------------------------------------------------
function buildDataIndex() {
  const dataDir = path.join(REPO_ROOT, 'data');
  if (!fs.existsSync(dataDir)) {
    return { files: [], counts: {}, l2Countries: [], childrenByParent: {}, extByCountry: {} };
  }

  const allFiles = walkDir(dataDir).filter((f) => f.endsWith('.fgb')).map(relPath).sort();

  const l2Countries = [];
  const childrenByParent = {};
  const extByCountry = {};
  const roadsByCountry = {};
  let rootCountryFile = null;

  for (const file of allFiles) {
    const parts = file.split('/');
    const filename = parts[parts.length - 1];
    const base = path.basename(filename, '.fgb');

    if (file === 'data/COUNTRY.fgb' || file === 'data/countries-110m.fgb') {
      rootCountryFile = file;
    } else if (parts.length === 2) {
      // Direct child of data/: either XX.fgb or XX-ZZ.fgb
      if (base.includes('-')) {
        // e.g. JP-roads.fgb or TW-powerpoles.fgb
        const [iso, ...rest] = base.split('-');
        const extType = rest.join('-');
        if (!extByCountry[iso]) extByCountry[iso] = {};
        extByCountry[iso][extType] = file;
        if (extType === 'roads') {
          roadsByCountry[iso] = file;
        }
      } else {
        // e.g. JP.fgb, US.fgb (Country Admin-1 subdivisions)
        l2Countries.push(base);
      }
    } else {
      // Deeper hierarchy: e.g. data/JP/1.fgb or data/US/US-CA.fgb or data/A/B/C.fgb
      const parentDirParts = parts.slice(1, -1);
      const parentKey = parentDirParts.join('::');
      if (!childrenByParent[parentKey]) childrenByParent[parentKey] = [];
      childrenByParent[parentKey].push(file);
    }
  }

  l2Countries.sort();

  return {
    root: rootCountryFile,
    counts: {
      total: allFiles.length,
      l2: l2Countries.length,
      subdivisionParents: Object.keys(childrenByParent).length,
      roads: Object.keys(roadsByCountry).length,
      extObjects: Object.keys(extByCountry).length
    },
    l2Countries,
    childrenByParent,
    subdivisionsByCountry: childrenByParent,
    roadsByCountry,
    extByCountry,
    files: allFiles
  };
}

// -------------------------------------------------------------
// 4. Build Images Index (images/**/*)
// -------------------------------------------------------------
function buildImagesIndex() {
  const imagesDir = path.join(REPO_ROOT, 'images');
  if (!fs.existsSync(imagesDir)) {
    return { count: 0, files: [], byCategory: {} };
  }

  const validExts = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);
  const allImages = walkDir(imagesDir)
    .filter((f) => validExts.has(path.extname(f).toLowerCase()))
    .map(relPath)
    .sort();

  const byCategory = {};
  for (const file of allImages) {
    const parts = file.split('/');
    if (parts.length > 2) {
      const category = parts[1];
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(file);
    }
  }

  return {
    count: allImages.length,
    files: allImages,
    byCategory
  };
}

// -------------------------------------------------------------
// Run builders and write indexes
// -------------------------------------------------------------
console.log('Generating Info Cards index...');
const infoIndex = buildInfoIndex();
fs.writeFileSync(path.join(outputDir, 'info-index.json'), JSON.stringify(infoIndex, null, 2), 'utf-8');

// Also write a compact targets-only inverted index for lightweight lookups
fs.writeFileSync(
  path.join(outputDir, 'info-targets.json'),
  JSON.stringify(infoIndex.targets, null, 2),
  'utf-8'
);

console.log('Generating Layers index...');
const layersIndex = buildLayersIndex();
fs.writeFileSync(path.join(outputDir, 'layers-index.json'), JSON.stringify(layersIndex, null, 2), 'utf-8');

console.log('Generating Data index...');
const dataIndex = buildDataIndex();
fs.writeFileSync(path.join(outputDir, 'data-index.json'), JSON.stringify(dataIndex, null, 2), 'utf-8');

console.log('Generating Images index...');
const imagesIndex = buildImagesIndex();
fs.writeFileSync(path.join(outputDir, 'images-index.json'), JSON.stringify(imagesIndex, null, 2), 'utf-8');

// Build Master Root index
const masterIndex = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  manifests: {
    data: 'data-index.json',
    layers: 'layers-index.json',
    info: 'info-index.json',
    infoTargets: 'info-targets.json',
    images: 'images-index.json'
  },
  summary: {
    fgbFiles: dataIndex.counts.total,
    layers: layersIndex.totalLayers,
    infoCards: infoIndex.totalCards,
    images: imagesIndex.count
  }
};
fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(masterIndex, null, 2), 'utf-8');

console.log('✅ Successfully generated all index files in:', outputDir);
console.log(`- index.json (master root manifest)`);
console.log(`- info-index.json (${infoIndex.totalCards} cards across ${infoIndex.files.length} files)`);
console.log(`- info-targets.json (${Object.keys(infoIndex.targets).length} target keys indexed)`);
console.log(`- layers-index.json (${layersIndex.totalLayers} layers)`);
console.log(`- data-index.json (${dataIndex.counts.total} FGB files)`);
console.log(`- images-index.json (${imagesIndex.count} image assets)`);

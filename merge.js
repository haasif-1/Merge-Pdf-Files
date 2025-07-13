const PDFMerger = require('pdf-merger-js').default;
const path = require('path');

// let p1 = './jsmath.pdf';
// let p2 = './English_Paper.pdf';

// let r1 = '1,2';
// let r2 = '2';

async function mergePDFs(p1,r1, p2, r2) {
  const merger = new PDFMerger();

  if (r1 && r1.trim() !== '') {
    await merger.add(p1, r1.trim());
  } else {
    await merger.add(p1);
  }

  if (r2 && r2.trim() !== '') {
    await merger.add(p2, r2.trim());
  } else {
    await merger.add(p2);
  }

  let d = new Date().getTime();
  const outputPath = path.join(__dirname, 'public', `${d}.pdf`);
  await merger.save(outputPath);
  return d;
}

// mergePDFs(p1, r1, p2, r2);

module.exports = { mergePDFs };

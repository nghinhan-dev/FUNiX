const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function createPdf({ items, total, user }) {
  const doc = new PDFDocument({ size: "A3" });
  const orderPath = path.join(
    __dirname,
    "..",
    "data",
    "orders",
    `${uuidv4()}.pdf`
  );

  doc.pipe(fs.createWriteStream(orderPath));

  const headers = ["_id", "Title", "Price", "Description", "Image", "Quantity"];

  // Table dimensions and styles
  const tableX = 50;
  const tableY = 100;
  const cellPadding = 10;
  const cellWidth = 120;
  const headerHeight = 30;
  const rowHeight = 80;

  doc.text(`Customer name : ${user}`);
  doc.text(`Total : ${total}`);
  // Draw table headers
  doc.font("Helvetica-Bold").fontSize(12);
  for (let i = 0; i < headers.length; i++) {
    doc.rect(tableX + i * cellWidth, tableY, cellWidth, headerHeight).stroke();
    doc.text(
      headers[i],
      tableX + i * cellWidth + cellPadding,
      tableY + cellPadding,
      { width: cellWidth, align: "center" }
    );
  }

  // Draw table data
  doc.font("Helvetica").fontSize(10);
  for (let i = 0; i < items.length; i++) {
    let keys = Object.keys(items[i]);

    for (let j = 0; j < keys.length; j++) {
      doc
        .rect(
          tableX + j * cellWidth,
          tableY + headerHeight + i * rowHeight,
          cellWidth,
          rowHeight
        )
        .stroke();
      if (keys[j] !== "imageUrl") {
        doc.text(
          items[i][keys[j]],
          tableX + j * cellWidth + cellPadding,
          tableY + headerHeight + i * rowHeight + cellPadding,
          { width: cellWidth, align: "center", lineBreak: true }
        );
      } else {
        doc.image(
          path.join(__dirname, "..", "data", "1-1210009435EGmE.jpg"),
          tableX + j * cellWidth + cellPadding,
          tableY + headerHeight + i * rowHeight + cellPadding,
          { width: 80, align: "center" }
        );
      }
    }
  }

  // Finalize the PDF document
  doc.end();
}

module.exports = { createPdf };

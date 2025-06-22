import jsPDF from "jspdf";

export const downloadAllPDFs = (results) => {
  results.forEach((res) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Resume Analysis Report`, 20, 20);
    doc.setFontSize(12);

    doc.text(`File: ${res.fileName}`, 20, 35);
    doc.text(`Match Score: ${res.matchPercentage.toFixed(2)}%`, 20, 45);
    doc.text(`Missing Skills: ${res.missingSkills.join(", ") || "None"}`, 20, 55);
    doc.text(`Suggestions:`, 20, 70);
    doc.setFontSize(11);
    doc.text(res.suggestions || "No suggestions", 20, 80, { maxWidth: 170 });

    doc.save(`${res.fileName || "Resume"}_Analysis_Report.pdf`);
  });
};

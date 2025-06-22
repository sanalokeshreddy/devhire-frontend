export const exportToCSV = (data, filename = "DevHire-Results.csv") => {
  const headers = ["Filename", "Match Score (%)", "Missing Skills", "Suggestions", "Summary"];

  const rows = data.map((item) => [
    item.fileName,
    item.matchPercentage.toFixed(2),
    item.missingSkills.join(", "),
    item.suggestions.replace(/\n/g, " "),
    item.summary.replace(/\n/g, " ")
  ]);

  const csvContent =
    [headers, ...rows]
      .map((e) => e.map((field) => `"${field}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

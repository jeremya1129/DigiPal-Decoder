import * as XLSX from 'xlsx';

/**
 * Clean and escape string for CSV according to RFC 4180
 */
function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Client-side CSV export replacing legacy Power Automate Hardware_SEAdv_CSV flow
 */
export function exportToCSV(items, filename = 'DigiPal_BOM_Export.csv') {
  if (!items || items.length === 0) {
    alert('Bill of Materials is empty. Add items first before exporting.');
    return;
  }

  const headers = ['Line #', 'Product Part Number', 'Designation / Tag', 'Quantity', 'Catalog Family', 'Date Added'];
  const rows = items.map((item, idx) => [
    idx + 1,
    escapeCSV(item.product),
    escapeCSV(item.designation || ''),
    item.quantity || 1,
    escapeCSV(item.family || 'General'),
    escapeCSV(item.timestamp ? new Date(item.timestamp).toLocaleDateString() : new Date().toLocaleDateString())
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Excel (.xlsx) export
 */
export function exportToExcel(items, filename = 'DigiPal_BOM_Export.xlsx') {
  if (!items || items.length === 0) {
    alert('Bill of Materials is empty. Add items first before exporting.');
    return;
  }

  const data = items.map((item, idx) => ({
    'Line #': idx + 1,
    'Part Number': item.product,
    'Designation / Description': item.designation || '',
    'Quantity': item.quantity || 1,
    'Category / Family': item.family || 'General',
    'Date Added': item.timestamp ? new Date(item.timestamp).toLocaleDateString() : new Date().toLocaleDateString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  // Auto-fit column widths
  const colWidths = [
    { wch: 8 },
    { wch: 25 },
    { wch: 55 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 }
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DigiPal BOM');
  XLSX.writeFile(workbook, filename);
}

/**
 * Copy formatted text table to clipboard
 */
export async function copyBOMToClipboard(items) {
  if (!items || items.length === 0) {
    alert('No items to copy.');
    return false;
  }

  const lines = [
    '=== Schneider Electric DigiPal Bill of Materials (BOM) ===',
    `Generated: ${new Date().toLocaleString()}`,
    '',
    'Qty\tPart Number\t\tDesignation / Description',
    '-----------------------------------------------------------------------------------------'
  ];

  items.forEach((item, idx) => {
    lines.push(`${item.quantity}x\t${item.product}\t\t${item.designation || '-'}`);
  });

  lines.push('-----------------------------------------------------------------------------------------');
  lines.push(`Total Items: ${items.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0)}`);

  const text = lines.join('\n');
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

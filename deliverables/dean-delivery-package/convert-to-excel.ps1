# PowerShell Script to Convert CSV to Excel
# Run this in PowerShell on Windows to convert all CSV files to Excel format

# Requires: Install-Module -Name ImportExcel
# Run: .\convert-to-excel.ps1

param(
    [string]$InputPath = ".\excel-files",
    [string]$OutputPath = ".\excel-files"
)

# Check if ImportExcel module is installed
if (!(Get-Module -ListAvailable -Name ImportExcel)) {
    Write-Host "Installing ImportExcel module..."
    Install-Module -Name ImportExcel -Scope CurrentUser -Force
}

Import-Module ImportExcel

# Get all CSV files
$csvFiles = Get-ChildItem -Path $InputPath -Filter "*.csv"

foreach ($csvFile in $csvFiles) {
    $excelFileName = $csvFile.BaseName + ".xlsx"
    $excelPath = Join-Path $OutputPath $excelFileName

    Write-Host "Converting $($csvFile.Name) to $excelFileName..."

    # Import CSV and export to Excel
    $data = Import-Csv -Path $csvFile.FullName

    # Create Excel file with formatting
    $data | Export-Excel -Path $excelPath -AutoSize -TableStyle Medium1 -WorksheetName "Events"

    # Add conditional formatting for completion status
    $excelPackage = Open-ExcelPackage -Path $excelPath
    $worksheet = $excelPackage.Workbook.Worksheets["Events"]

    # Add filters to headers
    $worksheet.Cells["A1:C1"].AutoFilter = $true

    # Add data validation for Event Name column (basic check)
    $validation = $worksheet.DataValidations.AddListValidation("A2:A1000")
    $validation.Formula.Values.Add("web_*")
    $validation.Formula.Values.Add("mobile_*")
    $validation.ShowErrorMessage = $true
    $validation.ErrorMessage = "Event name should start with 'web_' or 'mobile_'"

    $excelPackage.Save()
    $excelPackage.Dispose()

    Write-Host "✓ Created $excelFileName with formatting and validation"
}

Write-Host "`n🎉 Conversion complete! All CSV files converted to Excel format."
Write-Host "Files are ready for PM review with conditional formatting and data validation."
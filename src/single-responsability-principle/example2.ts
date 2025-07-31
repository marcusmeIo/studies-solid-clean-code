export class FinancialReport {
    startDate: string;
    endDate: string;

    constructor(
        startDate: string,
        endDate: string,
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export class FinancialReportRepository {
    public getData(report: FinancialReport) {
        console.log('Acessando relatório no DB...')
        return report
    }
}

export class FinancialReportPdfService {
    public exportPDF(report: FinancialReport) {
        console.log('Exportando PDF...')
    }
}

export class FinancialReportProcessor {
    public processReport(report: FinancialReport) {
        console.log('Processando relatório...')
        return report
    }
}

const financialReport = new FinancialReport('05/09/2025', '05/10/2025')
const reportRepository = new FinancialReportRepository
const reportProcessor = new FinancialReportProcessor
const reportService = new FinancialReportPdfService

const reportData = reportRepository.getData(financialReport)
const reportProcessed = reportProcessor.processReport(reportData)
reportService.exportPDF(reportProcessed)

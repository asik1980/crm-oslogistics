import { Injectable } from '@nestjs/common'

@Injectable()
export class GusService {
  async getDataByNip(nip: string) {
    console.log('🧪 MOCK GUS: symuluję pobranie danych z GUS dla NIP:', nip)

    // symulowane dane
    return {
      nazwa: 'Mock Firma GUS',
      miejscowosc: 'Mockowo',
      kodPocztowy: '00-001',
      ulica: 'Mockowa',
      nrNieruchomosci: '123',
      nrLokalu: '45',
    }
  }
}

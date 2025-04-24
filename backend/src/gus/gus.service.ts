import { Injectable } from '@nestjs/common'
import * as soap from 'soap'

@Injectable()
export class GusService {
  private readonly wsdlUrl =
    'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl.xsd'
  private readonly endpoint =
    'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'
  private readonly key = 'bdd6d21642fd4593b4a3'
  private readonly mode = process.env.GUS_MODE || 'mock'

  async getDataByNip(nip: string) {
    if (this.mode === 'mock') {
      console.log('🧪 GUS TRYB MOCK - zwracam dane testowe')
      return {
        nazwa: 'Test Firma GUS',
        miejscowosc: 'Warszawa',
        kodPocztowy: '00-001',
        ulica: 'Testowa',
        nrNieruchomosci: '12',
        nrLokalu: '3',
      }
    }

    try {
      const client = await soap.createClientAsync(this.wsdlUrl, {
        endpoint: this.endpoint,
      })

      const [loginResponse] = await client.ZalogujAsync({
        pKluczUzytkownika: this.key,
      })

      const sid = loginResponse?.ZalogujResult
      if (!sid) throw new Error('❌ Brak SID – logowanie nie powiodło się.')

      client.addHttpHeader('sid', sid)
      client.addSoapHeader({ sid })

      const [response] = await client.DaneSzukajPodmiotyAsync({
        pParametrySzukania: { Nip: nip },
      })

      const raw = response?.DaneSzukajPodmiotyResult
      if (!raw) return null

      const decoded = raw.replace(/&quot;/g, '"')
      const parsed = JSON.parse(decoded)

      return parsed?.[0] || null
    } catch (err) {
      console.error('❌ Błąd GUS:', err.message)
      return null
    }
  }
}

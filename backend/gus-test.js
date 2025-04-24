const soap = require('soap')

const wsdlUrl = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl.xsd'
const endpoint = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'
const key = 'bdd6d21642fd4593b4a3'
const testNip = '5862282298' // ← podmień na swój jeśli chcesz

async function testGus() {
  try {
    const client = await soap.createClientAsync(wsdlUrl, {
      endpoint, // produkcyjny endpoint
    })

    const [loginRes] = await client.ZalogujAsync({ pKluczUzytkownika: key })
    const sid = loginRes?.ZalogujResult
    if (!sid) throw new Error('❌ Brak SID')

    console.log('✅ SID z GUS:', sid)

    client.addHttpHeader('sid', sid)
    client.addSoapHeader({ sid })

    const [res] = await client.DaneSzukajPodmiotyAsync({
      pParametrySzukania: { Nip: testNip },
    })

    const raw = res?.DaneSzukajPodmiotyResult
    if (!raw) return console.log('❌ Brak danych z GUS')

    const decoded = raw.replace(/&quot;/g, '"')
    const parsed = JSON.parse(decoded)

    console.log('✅ Dane z GUS:', parsed[0])
  } catch (err) {
    console.error('❌ Błąd testu GUS:', err)
  }
}

testGus()

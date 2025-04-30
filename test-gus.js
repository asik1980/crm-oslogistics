const soap = require('soap')

const wsdl = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl.xsd'
const endpoint = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'
const key = 'bdd6d21642fd4593b4a3'
const testNip = '5862282298' // ← podstaw NIP testowy

async function fetchGusData() {
  try {
    const client = await soap.createClientAsync(wsdl, { endpoint })

    const [loginRes] = await client.ZalogujAsync({ pKluczUzytkownika: key })
    const sid = loginRes?.ZalogujResult

    if (!sid) throw new Error('❌ Brak SID')

    client.addHttpHeader('sid', sid)
    client.addSoapHeader({ sid })

    const [result] = await client.DaneSzukajPodmiotyAsync({
      pParametrySzukania: { Nip: testNip },
    })

    const raw = result?.DaneSzukajPodmiotyResult
    if (!raw) return console.log('❌ Brak danych z GUS')

    const decoded = raw.replace(/&quot;/g, '"')
    const parsed = JSON.parse(decoded)

    console.log('✅ Dane z GUS:', parsed[0])
  } catch (err) {
    console.error('❌ Błąd testu GUS:', err.message)
  }
}

fetchGusData()


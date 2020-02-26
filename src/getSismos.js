export default async function getSismos () {
  if (localStorage.getItem("sismos")) {
    return JSON.parse(localStorage.getItem("sismos"))
  }
  const response = await fetch("https://chilealerta.com/api/query/?user=demo&select=ultimos_sismos");
  const data = await response.json()
  localStorage.setItem("sismos", JSON.stringify(data.ultimos_sismos))
  return data.ultimos_sismos
}
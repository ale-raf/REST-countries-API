export async function getJSONData(id) {
  const res = await fetch("./data.json");
  const data = await res.json();
  let dataWithId = data.filter((data) => data.population == id)[0];
  return id ? dataWithId : data;
}

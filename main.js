// Obteniendo los repositorios de un usuario, dando el Nombre, URL y Lenguaje.
function getRepositories(user) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", `https://api.github.com/users/${user}/repos`, false );
  xmlHttp.send(null);
  const repJson = JSON.parse(xmlHttp.responseText);
  const repositories = [];
  for (var i = 0; i < repJson.length; i++) {
    var name = repJson[i].name;
    var url = repJson[i].html_url;
    if (repJson[i].language != null) {var language = repJson[i].language;}
    else {var language = "No language specified";}
    repositories.push([name, url, language]);
  }
  return repositories;
}

// Obteniendo información de un repositorio en específico.
function getRepository(user, repo) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", `https://api.github.com/repos/${user}/${repo}`, false );
  xmlHttp.send(null);
  const repJson = JSON.parse(xmlHttp.responseText);
  var fullName = repJson.full_name;
  var visibility = repJson.visibility;
  var isFork = repJson.fork;
  var url = repJson.html_url;
  const createDate = new Date(repJson.created_at);
  var creationDate = `${createDate.getDay()}/${createDate.getMonth()}/${createDate.getFullYear()}`;
  const updateDate = new Date(repJson.updated_at);
  var lastUpdateDate = `${updateDate.getDay()}/${updateDate.getMonth()}/${updateDate.getFullYear()}`;
  var stars = repJson.stargazers_count;
  var watches = repJson.watchers_count;
  const repositorio = [fullName, visibility, isFork, url, creationDate, lastUpdateDate, stars, watches];
  if (isFork) {
    repositorio.push(repJson.parent.full_name, repJson.parent.owner.login, repJson.parent.html_url);
  }
  return repositorio;
}

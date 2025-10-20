var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var deleteAllBtn = document.getElementById("clearAll");
var search = document.getElementById("search");
var sites = [];
var siteIndexToDelete = null;

if (localStorage.getItem("sitesArray") != null) {
  sites = JSON.parse(localStorage.getItem("sitesArray"));
  displaySites(sites);
}

updateDeleteAllVisibility();

function validationName() {
  var nameSiteRegex = /^[a-zA-Z]{3,}$/;
  if (nameSiteRegex.test(siteName.value) === true) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    return true;
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validationUrl() {
  var urlSiteRegex = /^https?:\/\//g;
  if (urlSiteRegex.test(siteUrl.value) === true) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
    return true;
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    return false;
  }
}

function addSite() {
  if (validationName() && validationUrl()) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    sites.push(site);
    clearValues();
    displaySites(sites);
    updateDeleteAllVisibility();
    localStorage.setItem("sitesArray", JSON.stringify(sites));
  } else {
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  }
}

function displaySites(array) {
  var card = "";
  for (var i = 0; i < array.length; i++) {
    card += `<tr>
                <td><span class="index-badge">${i + 1}</span></td>
                <td><span class="site-name">${array[i].name}</span></td>
                <td>
                  <div class="action-buttons">
                    <a href="${
                      array[i].url
                    }" class="btn btn-visit text-white" target="_blank">
                      <i class="fa-solid fa-eye pe-2"></i> Visit
                    </a>
                    <button onclick="showDeleteModal(${i})" class="btn btn-delete text-white">
                      <i class="fa-solid fa-trash-can pe-2"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>`;
  }
  document.getElementById("tableData").innerHTML = card;
}

function clearValues() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function showDeleteModal(index) {
  siteIndexToDelete = index;
  var modal = new bootstrap.Modal(document.getElementById("deleteSiteModal"));
  modal.show();
}

function confirmDeleteSite() {
  if (siteIndexToDelete !== null) {
    sites.splice(siteIndexToDelete, 1);
    displaySites(sites);
    updateDeleteAllVisibility();
    localStorage.setItem("sitesArray", JSON.stringify(sites));
    siteIndexToDelete = null;
    bootstrap.Modal.getInstance(
      document.getElementById("deleteSiteModal")
    ).hide();
  }
}

function deleteAll() {
  var modal = new bootstrap.Modal(document.getElementById("deleteAllModal"));
  modal.show();
}

function confirmDeleteAll() {
  sites.splice(0);
  displaySites(sites);
  updateDeleteAllVisibility();
  localStorage.removeItem("sitesArray");
  bootstrap.Modal.getInstance(document.getElementById("deleteAllModal")).hide();
}

function updateDeleteAllVisibility() {
  if (sites.length === 0) {
    deleteAllBtn.classList.add("d-none");
  } else {
    deleteAllBtn.classList.remove("d-none");
  }
}

function searchByName() {
  var searchSites = [];
  for (var i = 0; i < sites.length; i++) {
    if (
      sites[i].name
        .trim()
        .toLowerCase()
        .includes(search.value.trim().toLowerCase()) === true
    ) {
      searchSites.push(sites[i]);
    }
  }
  displaySites(searchSites);
}

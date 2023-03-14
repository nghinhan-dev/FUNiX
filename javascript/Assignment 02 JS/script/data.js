// export
let exportHandle = () => {
  console.log("petList:", petList);
  let petData = JSON.stringify(petList);

  var blob = new Blob([petData], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "petData.txt");
};

//import
let importHandle = () => {
  let file = document.getElementById("input-file").files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      let rawData = evt.target.result;
      let rawPetData = JSON.parse(rawData);
      let listJson = JSON.stringify(rawPetData);
      localStorage.setItem("PET_LIST", listJson);

      alert("Import file complete!");
    };
    reader.onerror = function () {
      alert("Error reading file");
    };
  }
};

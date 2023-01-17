const buttonstyles = {
    position: "fixed",
    right: 10,
    bottom: 20,
    cursor: "pointer",
    padding: 25,
    fontWeight: "bold",
    zIndex: 999,
}
const HandleExport = ()=>{

    const predata = "Title, Url \n";
    const titles = [...document.querySelectorAll(".TableTitle")].map((title)=>({
      title: title.innerText.replace(/,/g,""),
      url:  window.location.origin+title.innerHTML.split('"')[1].split('"')[0]
    }));
    const csvstring = "\uFEFF"+predata+titles.map(e=>`${e.title},${e.url}`).join("\n")
    const blob = new Blob([csvstring], { type: "data:text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

export default function ExButton(){
    return <button style={buttonstyles} className="button is-dark" onClick={HandleExport}>Export</button>
}

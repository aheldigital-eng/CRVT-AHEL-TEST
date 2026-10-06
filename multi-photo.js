(function(){
  const originalAddPhoto = window.addPhoto;
  window.openPhotoPicker = function(sec, mode){
    const input=document.createElement("input");
    input.type="file";
    input.accept="image/*";
    if(mode==="camera") input.setAttribute("capture","environment");
    else input.multiple=true;
    input.setAttribute("aria-label",mode==="camera"?"Prendre une photo":"Choisir une ou plusieurs photos");
    input.style.position="fixed";
    input.style.width="1px";
    input.style.height="1px";
    input.style.opacity="0.01";
    input.style.left="1px";
    input.style.top="1px";
    input.style.zIndex="2147483647";
    document.body.appendChild(input);
    const cleanup=()=>setTimeout(()=>{if(document.body.contains(input)) input.remove();},250);
    input.addEventListener("change",()=>{
      const files=Array.from(input.files||[]);
      files.forEach(file=>originalAddPhoto(file,sec));
      cleanup();
    },{once:true});
    input.addEventListener("cancel",cleanup,{once:true});
    input.click();
  };
})();
document.getElementById("all-items-container").addEventListener("click",async function(e){
    if (e.target.matches("button")){
        try{
            console.log(e.target.dataset)
            await fetch("/api/inventory/add",{
                  method: "POST",
                  body: JSON.stringify({inventory_id:e.target.dataset.inventory,item_id:e.target.dataset.item}),
                  headers: {"Content-Type":"application/json"}
              })
              document.location.reload()
        }catch(error){
            alert(error)
        }
    }
})


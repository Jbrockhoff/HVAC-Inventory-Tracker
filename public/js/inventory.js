//Function to add item to inventory

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
        };
    };
});
document.getElementById("all-items-container").addEventListener("click", async function(e) {
    if (e.target.matches(".delete-button")) {
        try {
            await fetch(`/api/inventory/delete/${e.target.dataset.inventory}`, {
                method: "DELETE"
            });
            document.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    if (e.target.matches(".update-button")) {
        const updatedItem = prompt("Enter the updated item:");
        if (updatedItem) {
            try {
                await fetch(`/api/inventory/update/${e.target.dataset.inventory}`, {
                    method: "PUT",
                    body: JSON.stringify({ updatedItem }),
                    headers: { "Content-Type": "application/json" }
                });
                document.location.reload();
            } catch (error) {
                alert(error);
            }
        }
    }
});

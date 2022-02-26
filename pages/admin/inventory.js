import ContainerInventory from "@/components/admin/inventory/ContainerInventory";
import Sidebar from "@/components/admin/layout/Sidebar";


const inventory = () => {
    return (
        <Sidebar>
            <ContainerInventory />
        </Sidebar>
    )
}

export default inventory
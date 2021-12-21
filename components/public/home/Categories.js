import { categories } from "../../../utils/data";
import CategoryItem from "./categoryItem";
import ScrollContainer from 'react-indiana-drag-scroll'


const Categories = () => {

    return (

            <ScrollContainer style={{ marginTop: '5%' }} className="scroll-container">
                {categories.map(item => (
                    <CategoryItem key={item.id} item={item} />
                ))}
            </ScrollContainer>

    )
}

export default Categories
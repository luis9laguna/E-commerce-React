import { useState, useRef } from 'react'
import useFetch from 'use-http'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '@/styles/ui/Upload.module.scss'
import { ClipLoader } from 'react-spinners'
import Cookies from 'js-cookie'

const Upload = ({ images, setImages, limit }) => {

    //STATE IMAGE
    const [checkedImages, setCheckedImages] = useState([])
    const [errorInput, setErrorInput] = useState('')

    //USEFETCH
    const options = { cachePolicy: 'no-cache', credentials: 'include', headers: { 'Authorization': Cookies.get('token') } }
    const { post, response, loading } = useFetch(`${process.env.url}/upload`, options)

    const fileInputRef = useRef();

    const imageHandlerChange = async e => {
        const inputImages = e.target.files
        const arrayImages = Array.from(inputImages)
        let errorReturn

        if (!inputImages) return
        if (arrayImages.length > limit || images.length >= limit) {
            setErrorInput(`El limite es de ${limit}`)
            errorReturn = true
        }
        //APPEND FORM DATA
        const data = new FormData()
        arrayImages.map(image => {
            if (image.size > 4024000) {
                setErrorInput("Limite del archivo es de 4mb")
                errorReturn = true
            }
            data.append('images', image, image.name)
        })

        //RETURN IF ERROR
        if (errorReturn) return

        //API CALL
        await post(data)
        if (response.ok) setImages(prev => prev.concat(response.data.images))
        setErrorInput('')
    }


    const checkImage = (e, data) => {
        if (e.target.checked) setCheckedImages(prev => [...prev, data])
        else setCheckedImages(prev => prev.filter(image => image !== data))
    }

    const deleteSelected = async () => {

        await post('delete', { checkedImages })
        if (response.ok) {
            checkedImages.map(checkedImage => {
                setImages(prev => prev.filter(image => image !== checkedImage))
            })
            setCheckedImages([])
            setErrorInput('')
        }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return
        const items = Array.from(images)
        const [reOrderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reOrderedItem)
        setImages(items)
    }


    return (
        <>
            <input ref={fileInputRef} hidden type='file' id="files" accept="image/png, image/jpeg" multiple onChange={imageHandlerChange} />
            <div className={styles.buttonInput} onClick={() => fileInputRef.current.click()}>
                {loading ? <ClipLoader color='#f5f5f5' loading={loading} size={25} />
                    : 'Seleccione Archivo'}
            </div>
            {errorInput && <span className={styles.error}>{errorInput}</span>}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                    {(provided, snapshot) => (
                        <ul className={`${styles.containerImage} ${snapshot.isDraggingOver && styles.isDraggingOver}`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {images && images.map((image, i) => (
                                <Draggable key={i} draggableId={JSON.stringify(i)} index={i}>
                                    {(provided, snapshot) => (
                                        <li className={`${styles.prevImage} ${snapshot.isDragging && styles.isDragging}`}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <img src={image} className={styles.img} />
                                            <div className={styles.containerCheckBox}>
                                                <input type="checkbox" onChange={(e) => checkImage(e, image)} />
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {checkedImages.length !== 0 && <div className={styles.selectedImages} onClick={deleteSelected}>Eliminar seleccionada</div>}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Upload
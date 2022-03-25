import { useState, useRef } from 'react'
import useFetch from 'use-http'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from '@/styles/ui/Upload.module.css'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

const Upload = ({ images, setImages, limit }) => {

    //STATE IMAGE
    const [checkedImages, setCheckedImages] = useState([])
    const [errorInput, setErrorInput] = useState('')

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, response, loading, error } = useFetch(`${process.env.url}/upload`, options)

    const fileInputRef = useRef();

    const imageHandlerChange = async e => {
        const inputImages = e.target.files
        const arrayImages = Array.from(inputImages)
        let errorReturn

        if (!inputImages) return
        if (arrayImages.length > limit || images.length >= limit) {
            setErrorInput(`The limit of images is ${limit}`)
            errorReturn = true
        }
        //APPEND FORM DATA
        const data = new FormData()
        arrayImages.map(image => {
            if (image.size > 4024000) {
                setErrorInput("Limit size of an image is 4mb")
                errorReturn = true
            }
            data.append('images', image, image.name)
        })

        //RETURN IF ERROR
        if (errorReturn) return

        //API CALL
        const resp = await post(data)
        if (response.ok) setImages(prev => prev.concat(resp.images))
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
                {loading ? <Loading /> : 'Pick File'}
            </div>
            {error && <ErrorMessage />}
            {errorInput && errorInput}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                    {(provided, snapshot) => (
                        <ul className={`${styles.containerPrev} ${snapshot.isDraggingOver && styles.isDraggingOver}`}
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
                                            <div className={styles.containerImg}>
                                                <img src={image} className={styles.img} />
                                            </div>
                                            <div className={styles.containerCheckBox}>
                                                <input type="checkbox" onChange={(e) => checkImage(e, image)} />
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {checkedImages.length !== 0 && <div className={styles.selectedImages} onClick={deleteSelected}>deleteSelected</div>}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Upload

const ErrorMessage = ({ message }) => {
    return (
        <div
            style={{
                color: 'white',
                fontWeight: 'bold',
                margin: 'auto',
                backgroundColor: 'red',
                textAlign: 'center',
                padding: '1rem 0',
                marginTop: '1rem'
            }}>
            {message}
        </div>
    )
}

ErrorMessage.defaultProps = {
    message: 'Ha habido un error, intente mas tarde.'
}

export default ErrorMessage
import './error.scss';

type Props = {
    errCode: any,
    errMsg: string
}

const ErrorElem = ({ errCode, errMsg }: Props) => {

    return (
        <div className="error-wrapper">
            <div>{errCode}</div>
            <div><h2>Something went wrong!</h2></div>
            <div><h2>{errMsg}</h2></div>
        </div>

    )
}

export default ErrorElem;
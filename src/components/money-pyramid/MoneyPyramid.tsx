import { moneyPyramid } from '../money-pyramid/moneyPyramidArr';

import './money-pyramid.scss';

type Props = {
    questionIndex: number
}

const MoneyPyramid = ({ questionIndex }: Props) => {

    return (
        <div className='pyramid'>
            <ul className='moneyList'>
                {moneyPyramid.map(m => (
                    <li key={m.id} className={questionIndex + 1 === m.id ? 'moneyListItem active' : 'moneyListItem'}>
                        <span className='moneyListItemNumber'>{m.id}</span>
                        <span className='moneyListItemAmount'>{m.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MoneyPyramid;
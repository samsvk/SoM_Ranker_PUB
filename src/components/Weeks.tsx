import React from 'react'
import { useCtx } from '../Store/useCtx'
import { Brackets } from '../Utils/Brackets';
import Select from 'react-select'
import { Title } from './Title';
import { BiTrash } from 'react-icons/bi'
import { RiAddLine } from 'react-icons/ri';
import { SELECT_OPTIONS, STARTING_DAY, ENDING_DAY, getWeekInfo, RenderSelect } from '../Utils/Weeks'

export const Weeks:React.FC = () => {
    const {weeks, setBracket, brackets, handleBracketChanges, handleDeleteChanges} = useCtx();
    if(!weeks) return null;
    
    return (
        <>
        <div className="week">
        <Title>
             Weekly breakdown:
        </Title>
        <p style={{marginTop: '-.5rem', marginBottom: '.5rem'}}>These calculations are based on Blizzards API and are scaled/flattened low-end based on the given values to ensure there's no false-results. HOWEVER if the 
            below results show that your next week rank is 99% we recommend that you stick with that bracket and don't take a higher bracket spot as it's highly 
            likely your character has built up enough bonus-RP throughout the weeks and will have enough RP to rank up.
        </p>    
            {weeks.map((week, index) => {
                return (
                    <div className="week-item" key={index}>
                        <div className="week-table">
                        <div className="table-item">
                            {index === 0 && <span className="table-subs">Week:</span>}
                            {STARTING_DAY.plus({ weeks: index }).toLocaleString({ month: 'short', day: 'numeric' })}{" "}-{" "}{ENDING_DAY.plus({ weeks: index}).toLocaleString({ month: 'short', day: 'numeric' })}
                            </div>
                            <div className="table-item">
                            {index === 0 && <span className="table-subs">starting at:</span>}
                                Rank: {week.starting.rank} - {week.starting.percent}%
                            </div>
                            <div className="table-item">
                            {index === 0 && <span className="table-subs">finishing at:</span>}
                                Rank: {week.ending.rank} - {week.ending.percent}%
                            </div>
                            <aside style={{flex:'.8'}}>
                                {RenderSelect(week, index, handleBracketChanges)}
                            </aside>
                            {
                                index === 0 && <span className='table-icon' style={{color:'rgba(234,234,234,1)'}}>Remove <BiTrash style={{marginLeft: '.5rem', verticalAlign: 'middle'}}size={20}/></span>
                            }
                            {
                                index !== 0 &&   <span className='table-icon' onClick={() => getWeekInfo(index, brackets, handleDeleteChanges)}>Remove <BiTrash style={{marginLeft: '.5rem', verticalAlign: 'middle'}}size={20}/></span>
                            }

                        </div>
                    </div>
                )
            })}
        </div>
        <div className="btn" onClick={() => setBracket(0)}><p>Add New Week</p><aside><div><RiAddLine size={22} /></div></aside></div>
        </>
    )
}

import React from 'react'
import { useCallback } from 'react'

const Legend = (props: any) => {
    const {label, legend, onClick} = props
    const onClickLabel = useCallback(() => { onClick(label)}, [label, onClick])
    return <span
        className="legend-label"
        onClick={onClickLabel}
        style={{ opacity: legend.active ? 1 : 0.5 }}
    >
        <div className="legend-label-block" style={{backgroundColor: legend.color}} />
        {label}
</span>
}

const Legends = (props: any) => {
    const {legends, onClick} = props
    const onClickLegend = useCallback((label: string) => {
        onClick(label)
    }, [onClick])
    return <div className="legend">
        {Object.keys(legends).map((label: string, index: number) => {
            const legend = legends[label] || {}
            return <Legend key={label} label={label} legend={legend} onClick={onClickLegend} />
        })}
    </div>
}

export default Legends
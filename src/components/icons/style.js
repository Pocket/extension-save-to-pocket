export const svgStyles = (additional_styles = {}) => {
    return {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '16px',
        height: '16px',
        marginRight: '5px',
        fill: 'currentColor',
        lineHeight: '1em',
        ...additional_styles
    }
}

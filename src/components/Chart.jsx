import React from 'react'
import { VictoryPie } from 'victory'
import './Chart.css'

const getLabel = ({ datum }) => (
  `${(datum.probability * 100).toFixed(0)}% ${datum.className}`
)

const getRadius = ({ datum }) => (
  100 - (datum.probability * 20)
)
// categories={{ x: ['Neutral', 'Drawing', 'Hentai', 'Porn', 'Sexy'] }}
export default function Chart({
  data
}) {
  if (!data.length) return null
  data = data.filter(item => item.probability >= 0.01)
  return (
    <div className="chart">
      <VictoryPie
        animate={true}
        height={250}
        padAngle={10}
        labels={getLabel}
        innerRadius={30}
        radius={getRadius}
        style={{
          labels: { fontFamily: 'inherit', fill: 'white' },
          data: { fill: 'white', fillOpacity: 0.2 }
        }}
        y="probability"
        data={data}
      />
    </div>
  )
}

// parent: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },

// export default ({
//   data,
//   ...props
// }) => {
//   return <Bar data={data} />
//   // return (
//   //   <ul {...props}>
//   //     {data.map(renderItem)}
//   //   </ul>
//   // )
// }

// function renderItem(item) {
//   return (
//     <li key={item.className}>
//       {item.className} {(item.probability * 100).toFixed(2)}%
//     </li>
//   )
// }
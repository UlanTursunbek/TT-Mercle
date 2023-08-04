import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { channels, messageCountList } from '../constants/mockData'
import engagementMessageOverTimeChartOptions from '../helpers/engagementHelper'

const EngagementMessagesOverTime = () => {
  const options = engagementMessageOverTimeChartOptions(messageCountList, channels)

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime

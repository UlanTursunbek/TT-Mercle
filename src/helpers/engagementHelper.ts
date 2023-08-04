import Highcharts from 'highcharts'

interface MessageCount {
  count: string
  timeBucket: string
  channelId: string
}

interface Channel {
  label: string
  value: string
  name: string
}

interface SeriesData {
  name: string
  data: number[][]
}

export default function engagementMessageOverTimeChartOptions(
  messageCountList: MessageCount[],
  channels: Channel[],
): Highcharts.Options {
  const channelMessages: { [channelId: string]: { count: number; timeBucket: number }[] } = {}

  messageCountList.forEach((message) => {
    const channelId = message.channelId
    if (!channelMessages[channelId]) {
      channelMessages[channelId] = []
    }
    channelMessages[channelId].push({
      count: parseInt(message.count, 10), // Parse to integer with base 10
      timeBucket: new Date(message.timeBucket).getTime(),
    })
  })

  const eligibleChannels = channels.filter((channel) => channelMessages[channel.value]?.length > 1)

  const seriesData = eligibleChannels.map((channel) => ({
    name: channel.name,
    data: channelMessages[channel.value].map((message) => [message.timeBucket, message.count]),
  }))

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: '#22222C',
      type: 'spline',
    },

    title: { text: '' },
    xAxis: {
      type: 'datetime',
      title: {
        text: '',
      },
      lineColor: '#636467',
      tickColor: '#636467',
      startOnTick: true,
      endOnTick: true,
      labels: {
        style: {
          color: '#636467',
        },
      },
      crosshair: {
        color: '#ACACAE',
      },
    },
    yAxis: {
      title: {
        text: '',
      },

      tickColor: '#636467',
      tickWidth: 1,
      gridLineColor: 'transparent',
      labels: {
        style: {
          color: '#636467',
        },
      },
    },
    plotOptions: {
      series: {
        color: '#008F8D',
        lineWidth: 2,
        marker: {
          states: {
            hover: {
              lineWidth: 0,
            },
          },
        },
      },
    },
    legend: {
      backgroundColor: '#15161B',
      itemStyle: {
        color: '#fff',
      },

      itemHoverStyle: {
        color: '#fff',
        textDecoration: 'line-through',
      },
      symbolWidth: 24,
      symbolHeight: 0,
    },
    tooltip: {
      backgroundColor: '#0C0C10',
      borderColor: '#105457',
      borderWidth: 1,
      style: {
        color: '#D1D1D1',
      },
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} messages on {point.x:%e %b }',
    },
    series: seriesData as Array<SeriesData> as Array<Highcharts.SeriesOptionsType>,
  }

  return options
}

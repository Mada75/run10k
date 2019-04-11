// keywork class to start a class
// name of class to be created is generally started with a capital letter
class Day {
  // constructor is expecting two values
  constructor(dayId, day, type, activity, comment, complete) {
    this.dayId = dayId
    this.day = day
    this.type = type
    this.activity = activity
    this.comment = comment
    this.complete = complete
  }
}
// create new Day, passes in properties
var day1 = new Day('1', 'monday', 'rest', 'rest up', null, false)
var day2 = new Day(
  '2',
  'tuesday',
  'interval',
  '2k warm-up then 8 x 400m @veryhard with 400m recoveries then 2k cool down',
  null,
  false
)
var day3 = new Day('3', 'wednesday', 'run', '4 - 7k @moderate', null, false)
var day4 = new Day(
  '4',
  'thursday',
  'fartlek',
  '30 - 35 min fartlek @moderate',
  null,
  false
)
var day5 = new Day('5', 'friday', 'rest', 'rest up', null, false)
var day6 = new Day(
  '6',
  'saturday',
  'tempo',
  '2k @easy then 4 x 1k @veryhard with 800m recoveries then 2k cool down',
  null,
  false
)
var day7 = new Day('7', 'sunday', 'run', '7k @easy', null, false)
const weekOne = [day1, day2, day3, day4, day5, day6, day7]
export { weekOne }
/*let template = {
  day8: {
    dayId: 8,
    day: 'monday',
    activity: 'rest up',
    type: 'rest',
    complete: false,
    comment: null
  },
  day9: {
    dayId: 9,
    day: 'tuesday',
    activity:
      '2k warm-up @moderate then 6 x 600m @hard with 400m recoveries then 2k cool down',
    type: 'interval',
    complete: false,
    comment: null
  },
  day10: {
    dayId: 10,
    day: 'wednesday',
    activity: '4 - 7k @moderate',
    type: 'run',
    complete: false,
    comment: null
  },
  day11: {
    dayId: 11,
    day: 'thursday',
    activity: '30 - 40 mins @moderate, including hills',
    type: 'run',
    complete: false,
    comment: null
  },
  day12: {
    dayId: 12,
    day: 'friday',
    activity: 'rest up',
    type: 'rest',
    complete: false,
    comment: null
  },
  day13: {
    dayId: 13,
    day: 'saturday',
    activity:
      '2k @easy then 3 x 2k @hard with 1k recoveries @veryeasy then 2k @easy',
    type: 'tempo',
    complete: false,
    comment: null
  },
  day14: {
    dayId: 14,
    day: 'sunday',
    activity: '8k @easy',
    type: 'run',
    complete: false,
    comment: null
  }
}

export default {
  weeks: template
}
*/

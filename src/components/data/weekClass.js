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
// start week one
// create new Day, passes in properties
var day1 = new Day('01', 'monday', 'rest', 'rest up', null, false)
var day2 = new Day(
  '02',
  'tuesday',
  'interval',
  '2k warm-up then 8 x 400m @veryhard with 400m recoveries then 2k cool down',
  null,
  false
)
var day3 = new Day('03', 'wednesday', 'run', '4 - 7k @moderate', null, false)
var day4 = new Day(
  '04',
  'thursday',
  'fartlek',
  '30 - 35 min fartlek @moderate',
  null,
  false
)
var day5 = new Day('05', 'friday', 'rest', 'rest up', null, false)
var day6 = new Day(
  '06',
  'saturday',
  'tempo',
  '2k @easy then 4 x 1k @veryhard with 800m recoveries then 2k cool down',
  null,
  false
)
var day7 = new Day('07', 'sunday', 'run', '7k @easy', null, false)
// end week one
// start week two
var day8 = new Day('08', 'monday', 'rest', 'rest up', null, false)
var day9 = new Day(
  '09',
  'tuesday',
  'interval',
  '2k warm-up @moderate then 6 x 600m @hard with 400m recoveries then 2k cool down',
  null,
  false
)
var day10 = new Day('10', 'wednesday', 'run', '4 - 7k @moderate', null, false)
var day11 = new Day(
  '11',
  'thursday',
  'run',
  '30 - 40 mins @moderate, including hills',
  null,
  false
)
var day12 = new Day('12', 'friday', 'rest', 'rest up', null, false)
var day13 = new Day(
  '13',
  'saturday',
  'tempo',
  '2k @easy then 3 x 2k @hard with 1k recoveries @veryeasy then 2k @easy',
  null,
  false
)
var day14 = new Day('14', 'sunday', 'run', '8k @easy', null, false)
//end week two
// start week three
var day15 = new Day('15', 'monday', 'rest', 'rest up', null, false)
var day16 = new Day(
  '16',
  'tuesday',
  'interval',
  '2k warm-up @moderate then 5 x 800m  @hard with 5 x 1k recovery @easy then 2k cool down @moderate',
  null,
  false
)
var day17 = new Day('17', 'wednesday', 'run', '6 - 8k @moderate', null, false)
var day18 = new Day(
  '18',
  'thursday',
  'fartlek',
  '30 - 40 min fartlek @moderate, include hills',
  null,
  false
)
var day19 = new Day('19', 'friday', 'rest', 'rest up', null, false)
var day20 = new Day(
  '20',
  'saturday',
  'tempo',
  '2k warm up @easy then 4k @hard then 4k @veryhard then 2k cool down @easy',
  null,
  false
)
var day21 = new Day('21', 'sunday', 'run', '7k @easy', null, false)
//end week three
// start week four
var day22 = new Day('22', 'monday', 'rest', 'rest up', null, false)
var day23 = new Day(
  '23',
  'tuesday',
  'interval',
  '2k @easy then 3 x 500m @veryhard with 300m recoveries and 800m @veryeasy between sets then 2k cool down @easy',
  null,
  false
)
var day24 = new Day('24', 'wednesday', 'run', '7 - 10k @moderate', null, false)
var day25 = new Day(
  '25',
  'thursday',
  'tempo',
  '2k warm up then 20 min tempo run @veryhard, 2k recovery',
  null,
  false
)
var day26 = new Day('26', 'friday', 'rest', 'rest up', null, false)
var day27 = new Day(
  '27',
  'saturday',
  'tempo',
  'warm up @easy then 4 x 1.5k @veryhard with 1k or recoveries @easy then cool down @easy',
  null,
  false
)
var day28 = new Day('28', 'sunday', 'run', '10k @easy', null, false)
//end week four
// start week five
var day29 = new Day('29', 'monday', 'rest', 'rest up', null, false)
var day30 = new Day(
  '30',
  'tuesday',
  'interval',
  '2k warm-up @easy then 12 x 400m with 400m recoveries @veryeasy then 2k cool down @easy',
  null,
  false
)
var day31 = new Day('31', 'wednesday', 'run', '6 - 8k @easy', null, false)
var day32 = new Day(
  '32',
  'thursday',
  'run',
  '20-45 min including hills @moderate',
  null,
  false
)
var day33 = new Day('33', 'friday', 'rest', 'rest up', null, false)
var day34 = new Day(
  '34',
  'saturday',
  'pyramid',
  'warm up then 1k@hard with 500m recovery, then 2k @hard with 1k recovery, then 3k @hard with 1k recovery @easy',
  null,
  false
)
var day35 = new Day('35', 'sunday', 'run', '12k @easy', null, false)
//end week five
// start week six
var day36 = new Day('36', 'monday', 'rest', 'rest up', null, false)
var day37 = new Day(
  '37',
  'tuesday',
  'interval',
  '2k warm-up, then 3 x 600m @veryhard with 400m recoveries, with 1k @moderate between sets then 2k cool down',
  null,
  false
)
var day38 = new Day('38', 'wednesday', 'run', '7 - 10k @easy', null, false)
var day39 = new Day(
  '39',
  'thursday',
  'fartlek',
  '40-45 min fartlek @easy',
  null,
  false
)
var day40 = new Day('40', 'friday', 'rest', 'rest up', null, false)
var day41 = new Day(
  '41',
  'saturday',
  'tempo',
  'warm up, then 5 x 1.5k @veryhard with 1k recoveries @veryeasy then 1k cool down',
  null,
  false
)
var day42 = new Day('42', 'sunday', 'run', '12k @easy', null, false)
//end week six
// start week seven
var day43 = new Day('43', 'monday', 'rest', 'rest up', null, false)
var day44 = new Day(
  '44',
  'tuesday',
  'interval',
  '2k warm-up then 12 x 400m @veryhard with 400m recoveries then 2k cool down @easy',
  null,
  false
)
var day45 = new Day('45', 'wednesday', 'run', '6 - 8k @easy', null, false)
var day46 = new Day(
  '46',
  'thursday',
  'tempo',
  'warm up then 20 mins @moderate',
  null,
  false
)
var day47 = new Day('47', 'friday', 'rest', 'rest up', null, false)
var day48 = new Day(
  '48',
  'saturday',
  'tempo',
  'gradually accelerate over 7k then 5k @veryhard',
  null,
  false
)
var day49 = new Day('49', 'sunday', 'run', '12k @easy', null, false)
//end week seven
// start week eight
var day50 = new Day('50', 'monday', 'rest', 'rest up', null, false)
var day51 = new Day(
  '51',
  'tuesday',
  'interval',
  '2k warm-up @easy then 5 x 1200m @veryhard 400m recoveries, then 2k cool down',
  null,
  false
)
var day52 = new Day('52', 'wednesday', 'run', '6 - 8k @easy', null, false)
var day53 = new Day('53', 'thursday', 'run', '30 - 40 min @easy', null, false)
var day54 = new Day('54', 'friday', 'rest', 'rest up', null, false)
var day55 = new Day(
  '55',
  'saturday',
  'tempo',
  '5 - 7k @easy with 10 x 100m strides @veryhard to finish',
  null,
  false
)
var day56 = new Day('56', 'sunday', 'race', '10k @veryhard', null, false)
//end week eight
const weekOne = [day1, day2, day3, day4, day5, day6, day7]
const weekTwo = [day8, day9, day10, day11, day12, day13, day14]
const weekThree = [day15, day16, day17, day18, day19, day20, day21]
const weekFour = [day22, day23, day24, day25, day26, day27, day28]
const weekFive = [day29, day30, day31, day32, day33, day34, day35]
const weekSix = [day36, day37, day38, day39, day40, day41, day42]
const weekSeven = [day43, day44, day45, day46, day47, day48, day49]
const weekEight = [day50, day51, day52, day53, day54, day55, day56]
export {
  weekOne,
  weekTwo,
  weekThree,
  weekFour,
  weekFive,
  weekSix,
  weekSeven,
  weekEight
}

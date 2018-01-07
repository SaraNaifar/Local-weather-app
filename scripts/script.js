$(document).ready(function () {
  $(document).ajaxStart(function () {
    $('#wait').css('display', 'block')
  })
  $(document).ajaxComplete(function () {
    $('#wait').css('display', 'none')
  })
})

var weatherInformation = $('p')

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition)
} else {
  weatherInformation.text('Geolocation is not supported by this browser.')
}

function getPosition (position) {
  myPosition = {'Latitude': position.coords.latitude, 'Longitude': position.coords.longitude }
  function getUrl () {
    $.ajax(
      {
        url: 'https://fcc-weather-api.glitch.me/api/current?',
        data: 'lat=' + myPosition.Latitude + '&lon=' + myPosition.Longitude,
        datatype: 'application/json',
        type: 'GET',
        success: function (data) {
          updateUI(data)
        }

      })
  }
  getUrl()
}

function updateUI (data) {
  var townName = data.name
  var weatherDescription = data.weather[0].description
  var temperature = data.main.temp
  var country = data.sys.country
  var currentDate = new Date()

  $('.town').text(townName + ' , ' + country)
  $('.weather-description').text(weatherDescription)
  $('.current-date').text(currentDate)

			/** ************ICON TEST WEATHER ***************/
  if (weatherDescription == 'few clouds' || weatherDescription == 'scattered clouds') {
    $('.icons-weather').html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>')
    $('body').css({'background-image': 'url(images/clouds.jpg)', 'background-repeat': 'no-repeat'})
  } else if (weatherDescription == 'light rain') {
    $('.icons-weather').html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>')
    $('body').css({'background-image': 'url(images/rain.jpg)', 'background-repeat': 'no-repeat'})
  } else if (weatherDescription == 'Clear') {
    $('.icons-weather').html('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>')
  }

  $('.temp').html(Math.round(temperature))
  $('.temperature').click(function () {
    var $tempt = $('.degre').text()

    if ($tempt == '°C') {
      var $farh = Math.round((data.main.temp * 1.8) + 32)
      $('.temp').text($farh)
      $('.degre').text('°F')
    }				else {
      $('.temp').text(Math.round(data.main.temp))
      $('.degre').text('°C')
    }
  })
}

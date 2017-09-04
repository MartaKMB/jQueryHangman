$(document).ready(function () {
  
    $('#playground').css('display', 'none');
  
    $('#start').click(function () {
        
        /* preparation playground*/
  
        $('#playground').show();
        $('#start').hide();

        /* random word/sentence creation */

        const sentence_array = [sentence_1, sentence_2, sentence_3];
        const array_length = parseInt(sentence_array.length);
        let random_sentence = Math.floor(Math.random() * array_length);

        const game_sentence = sentence_array[random_sentence];

        game_sentence.create_div_letter();

        /* letters buttons creation */

        const letters_array = $('.single_letter');

        /* click on letters */

        let counter = 0;

        for(let i = 0; i < letters_array.length; i++) {

          $(letters_array[i]).click(function () {
            let letter_val = $(letters_array[i]).text();
            sentence_1.show_letter(letter_val);
            let flag_letter = game_sentence.show_letter(letter_val);

            const div_sentence = $('#sentence').html();

            /* win */

            if (!(div_sentence.includes("-"))){
              $('#one_more').css('display', 'block');
                $(letters_array).attr("disabled", true);
                $('#msg_div').css('display', 'block');
                $('#msg_div').text('GRATULUJEMY WYGRANEJ!');
                one_more();  
            }

            /* check correct letter */

            if(flag_letter == true) {
              $(letters_array[i]).css('background', 'green');
              $(letters_array[i]).attr("disabled", true);
            } else {
              $(letters_array[i]).css('background', 'red');
              $(letters_array[i]).attr("disabled", true);

              counter++;

              switch(counter) {
                case 1:
                  $('.basis').css('display', 'block');
                  break;
                case 2:
                  $('.gibbet').css('display', 'block');
                  break;
                case 3:
                  $('.rope').css('display', 'block');
                  break;
                case 4:
                  $('.head').css('display', 'block');
                  break;
                case 5:
                  $('.body').css('display', 'block');
                  break;  
                case 6:
                  $('.hands').css('display', 'block');
                  break;
                case 7:
                  $('.legs').css('display', 'block');

                  $('#msg_div').css('display', 'block');
                  $('#msg_div').text('KONIEC GRY!');

                  $('#one_more').css('display', 'block');
                  $(letters_array).attr("disabled", true);
                  one_more();

                  counter = 0;
                  break;
                            }
          }
        });
        }
    });
 
  function one_more() {
    $("#yes").click(function () {
      $(this).data('clicked', true);
      
      if($('#yes').data('clicked')) {
         // window.location.replace(window.location.href + "?single");
        history.go(0);
       }
     });
          
     $("#no").click(function () {
       $(this).data('clicked', true);
            
         if($('#no').data('clicked')) {
            $('#playground').css('display', 'none');
            $('#end').css('display', 'block');
         }
     });
  }
  
  /* constructor for sentence */
  
  function Sentence(sentence_letter) {
    this.sentence_letter = sentence_letter;
    this.create_div_letter = function() {
      for(let i = 0; i < sentence_letter.length; i++) {
        $('#sentence').append('<div class="' + this.sentence_letter[i] + '">'+ '-'+'</div>');
      }
    };
    this.show_letter = function(letter){ 
      for(let i=0; i< sentence_letter.length;i++){
        let flag = true;
        let div_letter = '.' + this.sentence_letter[i];
        if(letter === this.sentence_letter[i] && $(div_letter).text('')){
          $('.'+ this.sentence_letter[i]).append(this.sentence_letter[i]);
          return flag;
        }   
      }
     };
    };
  
  /* buttons with letter create */
  
  for(let i = 65; i <= 90; i++) {
    let char = String.fromCharCode(i);
    $('#letters').append('<button class="single_letter">' + char + '</button>');
  }
 
  /* sentence */
  
  const sent1_array = ['K', 'A', 'J', 'A', 'K' ];
  const sentence_1 = new Sentence(sent1_array);
  
  const sent2_array = ['W', 'I', 'O', 'S', 'N', 'A'];
  const sentence_2 = new Sentence(sent2_array);
  
  const sent3_array = ['M', 'O', 'T', 'Y', 'L', 'E', 'K'];
  const sentence_3 = new Sentence(sent3_array);
 
});
/**
  *  gollum.dialog.js
  *
  *  Used for dialogs. Duh.
  *
  */
  
(function($) {
   
   var Dialog = {
     
     debugOn: false,
     markupCreated: false,
     
     attachEvents: function( evtOK ) {
       $('#gollum-dialog-action-ok').click(function( e ) {
        Dialog.eventOK( e, evtOK );
       });
       $('#gollum-dialog-action-cancel').click( Dialog.eventCancel );
     },
     
     createFieldMarkup: function( fieldArray ) {
       var fieldMarkup = '<form method="post" action="/attachment" enctype="multipart/form-data" id="gollum-dialog-form"><fieldset>';
       for ( var i=0; i < fieldArray.length; i++ ) {
         if ( typeof fieldArray[i] == 'object' ) {
           fieldMarkup += '<div class="field">';
           switch ( fieldArray[i].type ) {
           
             case 'text':
              fieldMarkup += Dialog.createFieldText( fieldArray[i] );
              break;

             // Based on the work of atduskgreg @ https://github.com/atduskgreg/gollum/commit/bc7090a1f3fdbc1d7be1e2a2c3624afe7f6f1ca4#L6R393
             case 'file':
              fieldMarkup += Dialog.createFieldFile( fieldArray[i] );
              break;

             // For situations in which you want to give the user the option of a file button or a text field
             case 'file_or_text':
              fieldMarkup += Dialog.createFieldFileOrText( fieldArray[i] );
              break;              
              
             default:
              break;
           
           }
           fieldMarkup += '</div>';
         }
       
       }
       fieldMarkup += '</fieldset></form>';
       return fieldMarkup;
     },
   
     createFieldText: function( fieldAttributes ) {
       var html = '';
     
       if ( fieldAttributes.name ) {
         html += '<label';
         if ( fieldAttributes.id ) {
           html += ' for="' + fieldAttributes.id + '"';
         }
         html += '>' + fieldAttributes.name + '</label>';
       }
     
       html += '<input type="text"';
     
       if ( fieldAttributes.id ) {
         html += ' name="' + fieldAttributes.id + '"'
         if ( fieldAttributes.type == 'code' ) {
           html+= ' class="code"';
         }
         html += ' id="gollum-dialog-dialog-generated-field-' +
                 fieldAttributes.id + '">';
       }
     
       return html;
     },

     createFieldFile: function( fieldAttributes ) {
       var html = '';
     
       if ( fieldAttributes.name ) {
         html += '<label';
         if ( fieldAttributes.id ) {
           html += ' for="' + fieldAttributes.id + '"';
         }
         html += '>' + fieldAttributes.name + '</label>';
       }
     
       html += '<input type="file"';
     
       if ( fieldAttributes.id ) {
         html += ' name="' + fieldAttributes.id + '"'
         if ( fieldAttributes.type == 'code' ) {
           html+= ' class="code"';
         }
         html += ' id="gollum-dialog-dialog-generated-field-' +
                 fieldAttributes.id + '">';
       }
     
       return html;
     },

     createFieldFileOrText: function( fieldAttributes ) {
       var html = '';
       
       html += '<div class="gollum-dialog-radio-controls">'
       html += '<input type="radio" name="file_or_text" value="file" id="' + fieldAttributes.id + '_file_or_text_file" checked="checked" /> <label for="' + fieldAttributes.id + '_file_or_text_file">File</label>'
       html += '<input type="radio" name="file_or_text" value="text" id="' + fieldAttributes.id + '_file_or_text_text" /> <label for="' + fieldAttributes.id + '_file_or_text_text">URL</label>'
       html += '</div>'
       
       html += '<div class="gollum-dialog-file">'
     
       if ( fieldAttributes.name ) {
         html += '<label';
         if ( fieldAttributes.id ) {
           html += ' for="' + fieldAttributes.id + '_file"';
         }
         html += '>' + fieldAttributes.name + ' File</label>';
       }
     
       html += '<input type="file"';
     
       if ( fieldAttributes.id ) {
         html += ' name="' + fieldAttributes.id + '_file"'
         if ( fieldAttributes.type == 'code' ) {
           html+= ' class="code"';
         }
         html += ' id="gollum-dialog-dialog-generated-field-' +
                 fieldAttributes.id + '_file">';
       }
       
       html += '</div>'
       
       html += '<div class="gollum-dialog-text">'

       if ( fieldAttributes.name ) {
         html += '<label';
         if ( fieldAttributes.id ) {
           html += ' for="' + fieldAttributes.id + '_text"';
         }
         html += '>' + fieldAttributes.name + ' URL</label>';
       }
     
       html += '<input type="text"';
     
       if ( fieldAttributes.id ) {
         html += ' name="' + fieldAttributes.id + '_text"'
         if ( fieldAttributes.type == 'code' ) {
           html+= ' class="code"';
         }
         html += ' id="gollum-dialog-dialog-generated-field-' +
                 fieldAttributes.id + '_text">';
       }
       
       html += '</div>'

       options = $.GollumEditor.getActiveOptions();
       html += '<input type="hidden" name="page_name" value="' + options.Page + '" />'
     
       return html;
     },
   
     createMarkup: function( title, body ) {
       Dialog.markupCreated = true;
       return  '<div id="gollum-dialog-dialog">' +
               '<div id="gollum-dialog-dialog-inner">' +
               '<div id="gollum-dialog-dialog-bg">' +
               '<div id="gollum-dialog-dialog-title"><h4>' + 
                 title +'</h4></div>' +
               '<div id="gollum-dialog-dialog-body">' + body + '</div>' + 
               '<div id="gollum-dialog-dialog-buttons">' + 
               '<a href="#" title="Cancel" id="gollum-dialog-action-cancel" ' + 
               'class="minibutton">Cancel</a>' +
               '<a href="#" title="OK" id="gollum-dialog-action-ok" '+ 
               'class="minibutton">OK</a>' +
               '</div>' +
               '</div>' + 
               '</div>' + 
               '</div>';
     },
   
     eventCancel: function( e ) {
       e.preventDefault();
       debug('Cancelled dialog.');
       Dialog.hide();
     },
   
     eventOK: function( e, evtOK ) {
       e.preventDefault();
     
       var results = [];
       // get the results from each field and build them into the object
       $('#gollum-dialog-dialog-body input').each(function() {
         results[$(this).attr('name')] = $(this).val();
       });
     
       // pass them to evtOK if it exists (which it should)
       if ( evtOK &&
            typeof evtOK == 'function' ) {
         evtOK( results );
       }
       Dialog.hide();
     },

     hide: function() {
       if ( $.browser.msie ) {
         $('#gollum-dialog-dialog').hide().removeClass('active');
         $('select').css('visibility', 'visible'); 
       } else {
         $('#gollum-dialog-dialog').animate({ opacity: 0 }, {
            duration: 200,
            complete: function() {
              $('#gollum-dialog-dialog').removeClass('active');
            }
          });
        }
     },
   
     init: function( argObject ) {
       var title = '';
       var body = '';
     
       // bail out if necessary
       if ( !argObject || 
            typeof argObject != 'object' ) {
         debug('Editor Dialog: Cannot init; invalid init object');
         return;
       }
       
       if ( argObject.body && typeof argObject.body == 'string' ) {
         body = '<p>' + argObject.body + '</p>';
       }
     
       // alright, build out fields
       if ( argObject.fields && typeof argObject.fields == 'object' ) {
         body += Dialog.createFieldMarkup( argObject.fields );
       }
     
       if ( argObject.title && typeof argObject.title == 'string' ) {
         title = argObject.title;
       }
     
       if ( Dialog.markupCreated ) {
         $('#gollum-dialog-dialog').remove();
       }
       var $dialog = $( Dialog.createMarkup( title, body ) );
       $('body').append( $dialog );
       if ( argObject.OK &&
            typeof argObject.OK == 'function' ) {
         Dialog.attachEvents( argObject.OK );
       }
       
       if ( $dialog.find('.gollum-dialog-radio-controls').length ) {
         $dialog.find('.gollum-dialog-text').hide();
         $dialog.find(':radio').change(function(e) {
           if ( $(this).is(':checked') ) {
             $dialog.find('.gollum-dialog-text').toggle();
             $dialog.find('.gollum-dialog-file').toggle();
             dialogHeight = $dialog.find('#gollum-dialog-dialog-bg').outerHeight();
             $dialog.find('#gollum-dialog-dialog-inner').css('height', dialogHeight + 'px');
          }
         });
       }
       
       Dialog.show();
     },
   
     show: function() {
       if ( !Dialog.markupCreated ) {
         debug('Dialog: No markup to show. Please use init first.');
       } else {
         debug('Showing dialog');
          if ( $.browser.msie ) {
            $('#gollum-dialog.dialog').addClass('active');
            Dialog.position();
            $('select').css('visibility', 'hidden'); 
          } else {
            $('#gollum-dialog.dialog').css('display', 'none');
            $('#gollum-dialog-dialog').animate({ opacity: 0 }, {
              duration: 0,
              complete: function() {
                $('#gollum-dialog-dialog').css('display', 'block');
                Dialog.position(); // position this thing
                $('#gollum-dialog-dialog').animate({ opacity: 1 }, {
                  duration: 500
                });
              }
            });
          }
       }
     },
   
     position: function() {
       var dialogHeight = $('#gollum-dialog-dialog-inner').height();
       $('#gollum-dialog-dialog-inner')
         .css('height', dialogHeight + 'px')
         .css('margin-top', -1 * parseInt( dialogHeight / 2 )); 
     }
   
  }; 
  
  var debug = function(m) {
    if ( Dialog.debugOn
         && typeof console != 'undefined' ) {
      console.log( m );
    }
  };
  
  $.GollumDialog = Dialog;
 
})(jQuery);
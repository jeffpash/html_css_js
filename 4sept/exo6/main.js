/*
            Déclarations
            */
           let stringNumber = `un`;
           let numberString = `1`;
           let numberInteger = 1;
           let numberBoolean = true;
       //

       /*
       Les opérateurs de comparaison
       */
           // Comparateur d'égalité simple ==
           console.log( numberString == stringNumber );
           console.log( numberString == numberInteger );
           console.log( numberBoolean == numberInteger );
           console.log( numberBoolean == numberInteger == numberString );

           // Comparateur d'égalité strict ===
           console.log( numberString === numberInteger );
           console.log( numberBoolean === numberInteger );
           console.log( numberBoolean === numberInteger === numberString );

           // Comparateur d'inégalité simple !=
           console.log( numberInteger != numberString );

           // Comparateur d'inégalité strict !==
           console.log( numberInteger !== numberString );

           // Connaitre la valeur d'une variable
           console.log( typeof numberBoolean );

           // Connaitre le nombre de caractères d'une string
           console.log( numberString.length );
           console.log( stringNumber[2] )
       //
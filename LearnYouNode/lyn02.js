/**
 * LearnYouNode Workshop
 * Step 02 - Primi Passi
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var result = 0;

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    return 1;
}

for (var i=2; i<process.argv.length; i++){
    result += Number(process.argv[i]);
}

console.log(result);

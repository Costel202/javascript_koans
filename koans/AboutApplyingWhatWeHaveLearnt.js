var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function (x) { return x.containsNuts === false && _(x.ingredients).all(function (x) { return x !== "mushrooms" }) });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {     
     /* try chaining range() and reduce() */
     var sum = _(_.range(0, 1000)).chain()
        .reduce(function (sum, x) {
           if(x % 3 === 0 || x % 5 ===0){
              sum += x}
           return sum;
        }).value()

     expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

     /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products)
       .chain()
       .map(function (x) { return x.ingredients; })
       .flatten()
       .reduce(function (counts, word) {
          counts[word] = (counts[word] || 0) + 1;
          return counts;
       }, {}).value()

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
     var x = 600851475143;

         isPrime = function (n) {
            for (var i = 2, s = Math.sqrt(n) ; i <= s; i++)
               if (n % i === 0) return false;
            return n !== 1;
         },
         getLargestPrimeFactor = function (n) {
            var largestPrimeFactor;

            for (var factor = 2; factor <= Math.sqrt(n) ; factor++)
               if (n % factor === 0 && isPrime(factor))
                  largestPrimeFactor = factor;

            return largestPrimeFactor;
         };

   
     expect(getLargestPrimeFactor(x)).toBe(6857);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

     function isPalindrome(i) {
        return i.toString() == i.toString().split("").reverse().join("");
     }

     function getLargestPalindrome() {

        var arr = [];
        for (var i = 999; i > 100; i--) {
           for (var j = 999; j > 100; j--) {
              var mul = j * i;
              if (isPalindrome(mul)) {
                 arr.push(j * i);
              }
           }
        }

        return Math.max.apply(Math, arr);
     }


     expect(getLargestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
     var i = 20;
 
     while (i %  2 !== 0 || i %  3 !== 0 || i %  4 !== 0 || i %  5 !== 0 ||
            i %  6 !== 0 || i %  7 !== 0 || i %  8 !== 0 || i %  9 !== 0 ||
            i % 10 !== 0 || i % 11 !== 0 || i % 12 !== 0 || i % 13 !== 0 ||
            i % 14 !== 0 || i % 15 !== 0 || i % 16 !== 0 || i % 17 !== 0 ||
            i % 18 !== 0 || i % 19 !== 0 || i % 20 !== 0) {
        i += 20;
     }
     expect(i).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
     var n = 10;
     var sumOfTheSquares = _.range(0, n + 1).reduce(function (sum, x) { return sum + x * x; })
     var squareOfTheSums = _.range(0, n + 1).reduce(function (sum, x) { return sum + x; })
     squareOfTheSums *= squareOfTheSums;

     expect(squareOfTheSums - sumOfTheSquares).toBe(2640)
  });

  it("should find the 10001st prime", function () {
     isPrime = function (n) {
        for (var i = 2, s = Math.sqrt(n) ; i <= s; i++)
           if (n % i === 0) return false;
        return n !== 1;
     }

     var arr = [];
     var i = 0;
     while (arr.length < 10002) {
        if (isPrime(i))
           arr.push(i);
        i++;
     }
  
     expect(arr.pop()).toBe(104743);
  });
  
});

using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello Sahil, C# is running successfully!");
        Console.WriteLine("Beginner C# examples: array, string, loop, if-else, and functions");
        Console.WriteLine();

        // PrintSection("Sahil's C# Practice");
        LoopExamples();
        /*IfElseExamples();
        FunctionExamples();
        ArrayExamples();
        StringExamples();
        ArrayInterviewProblems();
        StringInterviewProblems();*/
    }

    static void PrintSection(string title)
    {
        Console.WriteLine();
        Console.WriteLine("========== " + title + " ==========");
    }

    static void LoopExamples()
    {
        PrintSection("Loop Examples");

        Console.WriteLine("For loop: print numbers from 1 to 5");
        for (int i = 1; i <= 5; i++)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();

        Console.WriteLine("While loop: print numbers from 5 to 1");
        int number = 5;
        while (number >= 1)
        {
            Console.Write(number + " ");
            number--;
        }
        Console.WriteLine();

        Console.WriteLine("Do-while loop: runs at least one time");
        int count = 1;
        do
        {
            Console.Write(count + " ");
            count++;
        } while (count <= 3);
        Console.WriteLine();

        Console.WriteLine("Foreach loop: print array values");
        int[] marks = { 80, 90, 75 };
        foreach (int mark in marks)
        {
            Console.Write(mark + " ");
        }
        Console.WriteLine();
    }

    static void IfElseExamples()
    {
        PrintSection("If-Else Examples");

        int age = 20;
        if (age >= 18)
        {
            Console.WriteLine("Age " + age + ": eligible to vote");
        }
        else
        {
            Console.WriteLine("Age " + age + ": not eligible to vote");
        }

        int marks = 72;
        if (marks >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (marks >= 75)
        {
            Console.WriteLine("Grade: B");
        }
        else if (marks >= 60)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: Fail");
        }

        int a = 12;
        int b = 18;
        if (a > b)
        {
            Console.WriteLine(a + " is greater");
        }
        else
        {
            Console.WriteLine(b + " is greater");
        }
    }

    static void FunctionExamples()
    {
        PrintSection("Function Examples");

        int sum = AddTwoNumbers(10, 20);
        Console.WriteLine("AddTwoNumbers(10, 20) = " + sum);

        int square = FindSquare(6);
        Console.WriteLine("FindSquare(6) = " + square);

        int factorial = FindFactorial(5);
        Console.WriteLine("FindFactorial(5) = " + factorial);

        bool isEven = IsEven(14);
        Console.WriteLine("IsEven(14) = " + isEven);
    }

    static int AddTwoNumbers(int firstNumber, int secondNumber)
    {
        return firstNumber + secondNumber;
    }

    static int FindSquare(int number)
    {
        return number * number;
    }

    static int FindFactorial(int number)
    {
        int result = 1;
        for (int i = 1; i <= number; i++)
        {
            result = result * i;
        }

        return result;
    }

    static bool IsEven(int number)
    {
        if (number % 2 == 0)
        {
            return true;
        }

        return false;
    }

    static void ArrayExamples()
    {
        PrintSection("Array Examples");

        int[] numbers = { 10, 20, 30, 40, 50 };

        Console.WriteLine("Print all array elements");
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.Write(numbers[i] + " ");
        }
        Console.WriteLine();

        int sum = 0;
        for (int i = 0; i < numbers.Length; i++)
        {
            sum = sum + numbers[i];
        }
        Console.WriteLine("Sum of array = " + sum);

        int largest = numbers[0];
        for (int i = 1; i < numbers.Length; i++)
        {
            if (numbers[i] > largest)
            {
                largest = numbers[i];
            }
        }
        Console.WriteLine("Largest element = " + largest);

        int smallest = numbers[0];
        for (int i = 1; i < numbers.Length; i++)
        {
            if (numbers[i] < smallest)
            {
                smallest = numbers[i];
            }
        }
        Console.WriteLine("Smallest element = " + smallest);
    }

    static void StringExamples()
    {
        PrintSection("String Examples");

        string name = "Sahil";
        Console.WriteLine("String value = " + name);
        Console.WriteLine("String length = " + name.Length);

        Console.WriteLine("Print each character");
        for (int i = 0; i < name.Length; i++)
        {
            Console.WriteLine("Character at index " + i + " = " + name[i]);
        }

        string firstName = "Sahil";
        string lastName = "Khan";
        string fullName = firstName + " " + lastName;
        Console.WriteLine("Full name = " + fullName);

        string upper = name.ToUpper();
        string lower = name.ToLower();
        Console.WriteLine("Uppercase = " + upper);
        Console.WriteLine("Lowercase = " + lower);
    }

    static void ArrayInterviewProblems()
    {
        PrintSection("Array Interview Problems - Brute Force Easy Logic");

        int[] numbers = { 5, 2, 8, 2, 9, 1, 5 };

        Console.WriteLine("Original array");
        PrintArray(numbers);

        Console.WriteLine("Linear search: find 8");
        int searchValue = 8;
        int searchIndex = LinearSearch(numbers, searchValue);
        Console.WriteLine("Index of " + searchValue + " = " + searchIndex);

        Console.WriteLine("Reverse array");
        int[] reversed = ReverseArray(numbers);
        PrintArray(reversed);

        Console.WriteLine("Second largest element");
        int secondLargest = FindSecondLargest(numbers);
        Console.WriteLine("Second largest = " + secondLargest);

        Console.WriteLine("Print duplicate elements");
        PrintDuplicates(numbers);

        Console.WriteLine("Check if two arrays are equal");
        int[] firstArray = { 1, 2, 3 };
        int[] secondArray = { 1, 2, 3 };
        bool areEqual = AreArraysEqual(firstArray, secondArray);
        Console.WriteLine("Are arrays equal? " + areEqual);

        Console.WriteLine("Move zeroes to end");
        int[] zeroArray = { 1, 0, 2, 0, 3, 4 };
        int[] zeroesMoved = MoveZeroesToEnd(zeroArray);
        PrintArray(zeroesMoved);
    }

    static void StringInterviewProblems()
    {
        PrintSection("String Interview Problems - Brute Force Easy Logic");

        string word = "madam";
        Console.WriteLine("Reverse string: " + word);
        string reversed = ReverseString(word);
        Console.WriteLine("Reversed string = " + reversed);

        Console.WriteLine("Palindrome check: " + word);
        bool isPalindrome = IsPalindrome(word);
        Console.WriteLine("Is palindrome? " + isPalindrome);

        string sentence = "Hello World";
        Console.WriteLine("Count vowels in: " + sentence);
        int vowels = CountVowels(sentence);
        Console.WriteLine("Vowel count = " + vowels);

        string text = "programming";
        Console.WriteLine("Count character frequency in: " + text);
        PrintCharacterFrequency(text);

        string withSpaces = "C Sharp Practice";
        Console.WriteLine("Remove spaces from: " + withSpaces);
        string withoutSpaces = RemoveSpaces(withSpaces);
        Console.WriteLine("Without spaces = " + withoutSpaces);

        string first = "listen";
        string second = "silent";
        Console.WriteLine("Anagram check: " + first + " and " + second);
        bool isAnagram = AreAnagrams(first, second);
        Console.WriteLine("Are anagrams? " + isAnagram);
    }

    static void PrintArray(int[] numbers)
    {
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.Write(numbers[i] + " ");
        }
        Console.WriteLine();
    }

    static int LinearSearch(int[] numbers, int valueToFind)
    {
        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] == valueToFind)
            {
                return i;
            }
        }

        return -1;
    }

    static int[] ReverseArray(int[] numbers)
    {
        int[] reversed = new int[numbers.Length];
        int index = 0;

        for (int i = numbers.Length - 1; i >= 0; i--)
        {
            reversed[index] = numbers[i];
            index++;
        }

        return reversed;
    }

    static int FindSecondLargest(int[] numbers)
    {
        int largest = numbers[0];
        int secondLargest = numbers[0];

        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] > largest)
            {
                largest = numbers[i];
            }
        }

        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] > secondLargest && numbers[i] < largest)
            {
                secondLargest = numbers[i];
            }
        }

        return secondLargest;
    }

    static void PrintDuplicates(int[] numbers)
    {
        for (int i = 0; i < numbers.Length; i++)
        {
            bool alreadyPrinted = false;

            for (int k = 0; k < i; k++)
            {
                if (numbers[k] == numbers[i])
                {
                    alreadyPrinted = true;
                }
            }

            if (alreadyPrinted)
            {
                continue;
            }

            for (int j = i + 1; j < numbers.Length; j++)
            {
                if (numbers[i] == numbers[j])
                {
                    Console.Write(numbers[i] + " ");
                    break;
                }
            }
        }
        Console.WriteLine();
    }

    static bool AreArraysEqual(int[] firstArray, int[] secondArray)
    {
        if (firstArray.Length != secondArray.Length)
        {
            return false;
        }

        for (int i = 0; i < firstArray.Length; i++)
        {
            if (firstArray[i] != secondArray[i])
            {
                return false;
            }
        }

        return true;
    }

    static int[] MoveZeroesToEnd(int[] numbers)
    {
        int[] result = new int[numbers.Length];
        int index = 0;

        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] != 0)
            {
                result[index] = numbers[i];
                index++;
            }
        }

        return result;
    }

    static string ReverseString(string text)
    {
        string reversed = "";

        for (int i = text.Length - 1; i >= 0; i--)
        {
            reversed = reversed + text[i];
        }

        return reversed;
    }

    static bool IsPalindrome(string text)
    {
        int left = 0;
        int right = text.Length - 1;

        while (left < right)
        {
            if (text[left] != text[right])
            {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    static int CountVowels(string text)
    {
        int count = 0;

        for (int i = 0; i < text.Length; i++)
        {
            char ch = char.ToLower(text[i]);

            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
            {
                count++;
            }
        }

        return count;
    }

    static void PrintCharacterFrequency(string text)
    {
        for (int i = 0; i < text.Length; i++)
        {
            bool alreadyPrinted = false;

            for (int j = 0; j < i; j++)
            {
                if (text[j] == text[i])
                {
                    alreadyPrinted = true;
                }
            }

            if (alreadyPrinted)
            {
                continue;
            }

            int count = 0;
            for (int k = 0; k < text.Length; k++)
            {
                if (text[k] == text[i])
                {
                    count++;
                }
            }

            Console.WriteLine(text[i] + " = " + count);
        }
    }

    static string RemoveSpaces(string text)
    {
        string result = "";

        for (int i = 0; i < text.Length; i++)
        {
            if (text[i] != ' ')
            {
                result = result + text[i];
            }
        }

        return result;
    }

    static bool AreAnagrams(string first, string second)
    {
        if (first.Length != second.Length)
        {
            return false;
        }

        bool[] matched = new bool[second.Length];

        for (int i = 0; i < first.Length; i++)
        {
            bool found = false;

            for (int j = 0; j < second.Length; j++)
            {
                if (matched[j] == false && first[i] == second[j])
                {
                    matched[j] = true;
                    found = true;
                    break;
                }
            }

            if (found == false)
            {
                return false;
            }
        }

        return true;
    }
}

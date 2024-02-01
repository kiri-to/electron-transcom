#include <iostream>
#include <cmath>

#define EXPORT __declspec(dllexport)
extern "C"
{

  EXPORT int factorial(int max)
  {
    int i = max;
    int result = 1;

    while (i >= 2)
    {
      result *= i--;
    }

    return result;
  }


}
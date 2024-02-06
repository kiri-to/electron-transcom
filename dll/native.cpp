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

  EXPORT int *lg(int num, int *v)
  {
    int* t=new int[num];
    while (num)
    {
      --num;
      v[num] = log10(v[num]);
      t[num] = 170-num;
    }
    std::cout<<"v: "<<v<<std::endl<<"t: "<<t<<std::endl;
    return t;
  }

  EXPORT char* hello(char* input){
    return input;
  }
}
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
    while (num)
    {
      --num;
      v[num] = log10(v[num]);
    }
    return v;
  }

  int main()
  {
    int a[5]={1,10,100,1000,4124};
    int * b = lg(5,a);
    for(int i=0;i<5;i++){
      printf("%d\n",a[i]);
    }
    return 0;
  }
}
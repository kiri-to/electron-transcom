#include <iostream>
#include <cmath>
#include "liquid/liquid.h"

#define EXPORT __declspec(dllexport)
extern "C"
{

EXPORT int factorial(int max) {
    int i = max;
    int result = 1;

    while (i >= 2) {
        result *= i--;
    }

    return result;
}

EXPORT float *lg(int num, float *v) {
    while (num) {
        --num;
        v[num] = log10(v[num]);
    }
    std::cout << "v address: " << v << std::endl;
    return v;
}

EXPORT char *hello(char *input) {
    return input;
}


EXPORT bool fftShift(int nums, short *iq) {
    int fftsize =nums/2;
    liquid_float_complex *xc = new liquid_float_complex[fftsize], *yc = new liquid_float_complex[fftsize];
    for (int t = 0; t < fftsize; t++) {
        xc[t]._Val[0] = iq[2*t]* hann(t,fftsize);
        xc[t]._Val[1] = iq[2*t+1]* hann(t,fftsize);
    }

//执行fft
    fftplan plan = fft_create_plan(fftsize, xc, yc, LIQUID_FFT_FORWARD, 0);
    fft_execute(plan);
    fft_destroy_plan(plan);
//将yc复数转换为y
    for (int i = 0; i < fftsize; i++)
        ((float*)iq)[i] = 10 * log10(yc[i]._Val[0] * yc[i]._Val[0] + yc[i]._Val[1] * yc[i]._Val[1]);
    memcpy(xc,iq,nums);
    memcpy(iq,iq+fftsize,nums);
    memcpy(iq+fftsize,xc,nums);
    delete[] xc;
    delete[] yc;

    return true;
}


EXPORT bool fftiqShift(int nums, short *i,short  *q) {
    int fftsize =nums;
    liquid_float_complex *xc = new liquid_float_complex[fftsize], *yc = new liquid_float_complex[fftsize];
    for (int t = 0; t < fftsize; t++) {
        xc[t]._Val[0] = i[t]* hann(t,fftsize);
        xc[t]._Val[1] = q[t]* hann(t,fftsize);
    }

//执行fft
    fftplan plan = fft_create_plan(fftsize, xc, yc, LIQUID_FFT_FORWARD, 0);
    fft_execute(plan);
    fft_destroy_plan(plan);

//将yc复数转换为y
    for (int i = 0; i < fftsize; i++)
        q[i] = 10 * log10(yc[i]._Val[0] * yc[i]._Val[0] + yc[i]._Val[1] * yc[i]._Val[1]);
    memcpy(xc,q,fftsize);
    memcpy(q,q+fftsize/2,fftsize);
    memcpy(q+fftsize/2,xc,fftsize);

    delete[] xc;
    delete[] yc;

    return true;
}

}
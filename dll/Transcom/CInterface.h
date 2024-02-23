#pragma once
#include "PCIEApi.h"
#include <string>
#include <iostream>
#include <vector>
#include "XillyFile.h"
#include "Enum.h"

//供C C#调用 函数外部可用
#define TRABSCOMAPITOC extern "C" __declspec(dllexport)
TRABSCOMAPITOC int API_Init();

TRABSCOMAPITOC int Spectrum_GetData_InFreeRun(unsigned char* res, int TracePoints);

//TRABSCOMAPITOC bool open_file(int value);
//TRABSCOMAPITOC void Close_file();

TRABSCOMAPITOC int Device_OpenDevice();
TRABSCOMAPITOC int Device_ClosenDevice();
TRABSCOMAPITOC int CenterFreq_Set(double centerfreq);
TRABSCOMAPITOC int Span_Rbw_Set(double span, int Rbw, bool isTriggerMode);

TRABSCOMAPITOC int RF_LNA_ON();
TRABSCOMAPITOC int RF_SetATT(int ChannelID, double att);
TRABSCOMAPITOC int RF_SetHMCATT(int ChannelID);
TRABSCOMAPITOC int RF_SetGain(int ChannelID, unsigned int gain);
TRABSCOMAPITOC int IF_SetATT(double att);
TRABSCOMAPITOC int IF_SetAMP(double amp);

TRABSCOMAPITOC int RF_SetChannelSwitch(int ChannelID, int value);
TRABSCOMAPITOC int RF_SetChannel(int ChannelID);
TRABSCOMAPITOC int RF_SetSubChannel(int ChannelID, int value);

TRABSCOMAPITOC int HMC703_Reset();
TRABSCOMAPITOC int Si5386_Reset();
TRABSCOMAPITOC int HMC703_Init(int VCXO);
TRABSCOMAPITOC int Si5386_Init(int VCXO);
TRABSCOMAPITOC int Si5386_Curing(int VCXO);
TRABSCOMAPITOC int RefClk_Reset(int value);

TRABSCOMAPITOC int AD9695_Reset();
TRABSCOMAPITOC int ADC_Restored();
TRABSCOMAPITOC int ADC_SetSync();
TRABSCOMAPITOC int ADC_Reset();
TRABSCOMAPITOC int AD9695_Init();
TRABSCOMAPITOC int ADC_BPFFir();
TRABSCOMAPITOC int ADC_LPFFir();
TRABSCOMAPITOC int ADC_FirFactor(unsigned int* factor);
TRABSCOMAPITOC int ADC_ConfigNCO(double centerfreq, int value);
TRABSCOMAPITOC int ADC_DMA_MM2S();
TRABSCOMAPITOC int ADC_ControlShift(int value);
TRABSCOMAPITOC int ADC_Deci(int DecimateFactor);
TRABSCOMAPITOC int ADC_InitDeci(int DecimateFactor);
TRABSCOMAPITOC int AD9695_Mode();
TRABSCOMAPITOC int AD9695_Status();

TRABSCOMAPITOC int Jesd204B_Reset();
TRABSCOMAPITOC int Jesd204B_Init();
TRABSCOMAPITOC int Jesd204B_Status();

TRABSCOMAPITOC int Logic_Init(bool isTriggerMode);
TRABSCOMAPITOC double Logic_GetTemp();
TRABSCOMAPITOC double Logic_GetVCCINT();
TRABSCOMAPITOC double Logic_GetVCCAUX();
TRABSCOMAPITOC double Logic_GetVUSER();
TRABSCOMAPITOC int DDR0_GetStatus();
TRABSCOMAPITOC int DDR1_GetStatus();

TRABSCOMAPITOC int Logic_Set_win_lsb(unsigned int win_lsb);
TRABSCOMAPITOC int Logic_Set_trace_num(unsigned int trace_num);
TRABSCOMAPITOC int Logic_Set_RBW(int RBW);
TRABSCOMAPITOC int Logic_Set_Detector(DetectorType   Detector);
TRABSCOMAPITOC int Logic_Set_SweepTime(double SweepTime);
TRABSCOMAPITOC int Logic_Set_PersistenceNum(unsigned int PersistenceNum);
TRABSCOMAPITOC int Logic_Set_GraunityNum(unsigned int GraunityNum);
TRABSCOMAPITOC int Logic_Set_Offset(float Offset);
TRABSCOMAPITOC int Logic_Set_ZoomFactor(float ZoomFactor);
TRABSCOMAPITOC int Logic_Set_ValueScale(float ValueScale);

TRABSCOMAPITOC int Spectrum_GetData(unsigned char* SpectrumData, int TracePoints);
TRABSCOMAPITOC int Spectrum_SetTraceDetector(DetectorType  Detector);
TRABSCOMAPITOC int Spectrum_SetRefLevel(double reflevel);
TRABSCOMAPITOC int Spectrum_SetAttenuation(double att);
TRABSCOMAPITOC int Spectrum_SetSpanAndRbw(double span, int Rbw, bool isTriggerMode);
TRABSCOMAPITOC int Spectrum_SetSweepTime(double sweeptime);
TRABSCOMAPITOC double Spectrum_GetSweepTime();

TRABSCOMAPITOC int Persistence_GetData(unsigned char* PersistenceData, int TracePoints);
TRABSCOMAPITOC int Persistence_SetPersistenceNum_SetGraunityNum(uint32_t PersistenceNum, uint32_t GraunityNum);
TRABSCOMAPITOC int Persistence_SetOffset(float offset);
TRABSCOMAPITOC int Persistence_SetZoomFactor(float ZoomFactor);
TRABSCOMAPITOC int Persistence_SetValueScale(float  ValueScale);

TRABSCOMAPITOC int IQ_GetData_InFreeRun(unsigned char* IQData, double span);
TRABSCOMAPITOC int IQ_GetData_InPulseTrigger(std::vector<std::vector<uint8_t>>& res);
TRABSCOMAPITOC int IQ_GetData_InTrigger(std::vector<uint8_t>& res, int TrigOffsetAmount, double SetTriggerOffset, double Span);

TRABSCOMAPITOC int RunningMode_Set(int mode);
TRABSCOMAPITOC int RunningMode_SelectTriggerSource(TriggerSource  triggersource, double centerFreq, double ClockSample, double PostTrigger, double TriggerPower, unsigned int Pluse);
TRABSCOMAPITOC int RunningMode_ResetTriggerStatus(TriggerSource triggersource, double preTrigger);
TRABSCOMAPITOC int RunningMode_SelectTriggerType(TriggerMode  triggermode);
TRABSCOMAPITOC int RunningMode_SetTriggerLevel(int TriggerPowerLevel, double centerFreq);
TRABSCOMAPITOC int RunningMode_SetTriggerAMP(int AMP, double centerFreq);
TRABSCOMAPITOC int RunningMode_SetTriggerPostTime(unsigned  int posttime,double ClockSample);
TRABSCOMAPITOC int RunningMode_SetPulseNum(unsigned  int PulseNum);

TRABSCOMAPITOC int NVMe_ReadFileTable(unsigned char* res);
TRABSCOMAPITOC int NVMe_WriteStreamTable(unsigned int StratBlock, unsigned int Needblock);
TRABSCOMAPITOC int NVMe_StartStreaming(std::wstring name, double Time, uint64_t CenterFreq, double Span);
TRABSCOMAPITOC int NVMe_GetStatus();
TRABSCOMAPITOC int NVMe_ReadIData(unsigned int startblock, double span, double scope, unsigned char* IData);
TRABSCOMAPITOC int NVMe_ReadQData(unsigned int startblock, double span, double scope, unsigned char* QData);
TRABSCOMAPITOC int NVMe_TriggerOperation_GetIQData_1(unsigned char* IQPosition);
TRABSCOMAPITOC int NVMe_TriggerOperation_GetIQData_2(unsigned char* IQPosition);
TRABSCOMAPITOC int NVMe_ClearStreamData();
TRABSCOMAPITOC int NVMe_ReadIQData(unsigned int selectnum, double selecttime, double DisplayTimeOfData, unsigned char* IData, unsigned char* QData);
TRABSCOMAPITOC unsigned int NVMe_GetNeedBlock(double DisplayTimeOfData, double span);
TRABSCOMAPITOC int NVMe_ResetStream();

TRABSCOMAPITOC class Nvme {
public:
	std::vector<NvmeTable> tables;

	/**
	* @brief	获取流盘记录列表
	*/
	std::vector<NvmeTable> getTable();

	/**
	* @brief			读取流盘记录中第n条数据
	* @param n	    	待读取第n条数据,从0开始
	*/
	std::vector<std::vector<uint8_t> > readIQData(int n);

	/**
	* @brief		 开始流盘
	* @param name    流盘数据名称
	* @param time    流盘持续时间,单位s
	* @param cf		 中心频率
	* @param span	 带宽
	*/
	void write(std::wstring name, double time, uint64_t cf, double span);

	/**
	* @brief	清除所有流盘记录
	*/
	void cleanAll();
};
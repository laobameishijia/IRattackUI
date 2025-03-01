<template>
    <div>
        <h1>控制流图示例</h1>
        <ControlFlowGraph :data="llvmIRCode" />
    </div>
</template>
  
<script setup>
import ControlFlowGraph from '@/views/ControlFlowGraphBase.vue';

const llvmIRCode = `
    ; ModuleID = './check.c'
    source_filename = "./check.c"
    target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
    target triple = "x86_64-pc-linux-gnu"
  
    // 这里是你的LLVM IR代码...
  `;
</script>
  
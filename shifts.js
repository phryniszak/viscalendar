const _DAY_SHIFT = "shift-day";
const _NIGHT_SHIFT = "shift-night";
const _START_NIGHT_SHIFT = "shift-night-st";
const _END_NIGHT_SHIFT = "shift-night-en";
const _DAY_OFF = "shift-off";
const _UNKNOWN_SHIFT = "shift-unknown";

var shift = {};

shift.A = [7*8];
shift.B = [7*8];
shift.C = [7*8];
shift.D = [7*8];

// -------------------------------------
// 35 1-1. MON
shift.C[0]= _END_NIGHT_SHIFT;
shift.D[0]= _DAY_SHIFT;
// 1-2. TUE
shift.C[1]=_DAY_OFF;
shift.D[1]=_DAY_OFF;
// 1-3. WED
shift.C[2]=_DAY_OFF;
shift.D[2]=_START_NIGHT_SHIFT;
// 1-4. THU
shift.C[3]=_DAY_SHIFT;
shift.D[3]=_NIGHT_SHIFT;
// 1-5. FRI
shift.C[4]=_DAY_SHIFT;
shift.D[4]=_END_NIGHT_SHIFT;
// 1-6. SAT
shift.C[5]=_DAY_OFF;
shift.D[5]=_DAY_OFF;
// 1-7. SUN
shift.C[6]=_DAY_OFF;
shift.D[5]=_DAY_OFF;
// -------------------------------------
// 36 2-1. MON
shift.C[7]=_DAY_OFF;
shift.D[7]=_START_NIGHT_SHIFT;
// 2-2. TUE
shift.C[8]=_DAY_SHIFT;
shift.D[8]=_NIGHT_SHIFT;
// 2-3. WED
shift.C[9]=_DAY_SHIFT;
shift.D[9]=_END_NIGHT_SHIFT;
// 2-4. THU
shift.C[10]=_DAY_OFF;
shift.D[10]=_DAY_OFF;
// 2-5. FRI
shift.C[11]=_DAY_OFF;
shift.D[11]=_START_NIGHT_SHIFT;
// 2-6. SAT
shift.C[12]=_DAY_SHIFT;
shift.D[12]=_NIGHT_SHIFT;
// 2-7. SUN
shift.C[13]=_DAY_SHIFT;
shift.D[13]=_NIGHT_SHIFT;
// -------------------------------------
// 37 3-1. MON
shift.C[14]=_DAY_SHIFT;
shift.D[14]=_END_NIGHT_SHIFT;
// 3-2. TUE
shift.C[15]=_DAY_OFF;
shift.D[15]=_DAY_OFF;
// 3-3. WED
shift.C[16]=_DAY_OFF;
shift.D[17]=_START_NIGHT_SHIFT;
// 3-4. THU
shift.C[17]=_DAY_SHIFT;
shift.D[18]=_NIGHT_SHIFT;
// 3-5. FRI
shift.C[18]=_DAY_SHIFT;
shift.D[18]=_END_NIGHT_SHIFT;
// 3-6. SAT
shift.C[19]=_DAY_OFF;
shift.D[19]=_DAY_OFF;
// 3-7. SUN
shift.C[20]=_DAY_OFF;
shift.D[20]=_DAY_OFF;
// -------------------------------------
// 38 4-1. MON
shift.C[21]=_DAY_OFF;
shift.D[21]=_START_NIGHT_SHIFT;
// 4-2. TUE
shift.C[22]=_DAY_SHIFT;
shift.D[22]=_NIGHT_SHIFT;
// 4-3. WED
shift.C[23]=_DAY_SHIFT;
shift.D[23]=_END_NIGHT_SHIFT;
// 4-4. THU
shift.C[24]=_DAY_OFF;
shift.D[24]=_DAY_OFF;
// 4-5. FRI
shift.C[25]=_DAY_OFF;
shift.D[25]=_START_NIGHT_SHIFT;
// 4-6. SAT
shift.C[26]=_DAY_SHIFT;
shift.D[26]=_NIGHT_SHIFT;
// 4-7. SUN
shift.C[27]=_DAY_SHIFT;
shift.D[28]=_NIGHT_SHIFT;
// -------------------------------------
// 39 5-1. MON
shift.C[28]=_DAY_SHIFT;
shift.D[28]=_END_NIGHT_SHIFT;
// 5-2. TUE
shift.C[29]=_DAY_OFF;
shift.D[29]=_DAY_OFF;
// 5-3. WED 
shift.C[30]=_START_NIGHT_SHIFT;
shift.D[30]=_DAY_OFF;
// 5-4. THU
shift.C[31]=_NIGHT_SHIFT;
shift.D[31]=_DAY_SHIFT;
// 5-5. FRI
shift.C[32]=_END_NIGHT_SHIFT;
shift.D[32]=_DAY_SHIFT;
// 5-6. SAT
shift.C[33]=_DAY_OFF;
shift.D[33]=_DAY_OFF;
// 5-7. SUN
shift.C[34]=_DAY_OFF;
shift.D[34]=_DAY_OFF;
// -------------------------------------
// 40 6-1. MON
shift.C[35]=_START_NIGHT_SHIFT;
shift.D[35]=_DAY_OFF;
// 6-2. TUE
shift.C[36]=_NIGHT_SHIFT;
shift.D[36]=_DAY_SHIFT;
// 6-3. WED
shift.C[37]=_END_NIGHT_SHIFT;
shift.D[37]=_DAY_SHIFT;
// 6-4. THU
shift.C[38]=_DAY_OFF;
shift.D[38]=_DAY_OFF;
// 6-5. FRI
shift.C[39]=_START_NIGHT_SHIFT;
shift.D[40]=_DAY_OFF;
// 6-6. SAT
shift.C[40]=_NIGHT_SHIFT;
shift.D[40]=_DAY_SHIFT;
// 6-7. SUN
shift.C[41]=_NIGHT_SHIFT;
shift.D[41]=_DAY_SHIFT;
// -------------------------------------
// 41 7-1. MON
shift.C[42]=_END_NIGHT_SHIFT;
shift.D[42]=_DAY_SHIFT;
// 7-2. TUE
shift.C[43]=_DAY_OFF;
shift.D[43]=_DAY_OFF;
// 7-3. WED
shift.C[44]=_START_NIGHT_SHIFT;
shift.D[44]=_DAY_OFF;
// 7-4. THU
shift.C[45]=_NIGHT_SHIFT;
shift.D[45]=_DAY_SHIFT;
// 7-5. FRI
shift.C[46]=_END_NIGHT_SHIFT;
shift.D[46]=_DAY_SHIFT;
// 7-6. SAT
shift.C[47]=_DAY_OFF;
shift.D[48]=_DAY_OFF;
// 7-7. SUN
shift.C[48]=_DAY_OFF;
shift.D[48]=_DAY_OFF;
// -------------------------------------
// 42 8-1. MON
shift.C[49]=_START_NIGHT_SHIFT;
shift.D[49]=_DAY_OFF;
// 8-2. TUE
shift.C[50]=_NIGHT_SHIFT;
shift.D[50]=_DAY_SHIFT;
// 8-3. WED
shift.C[51]=_END_NIGHT_SHIFT;
shift.D[51]=_DAY_SHIFT;
// 8-4. THU
shift.C[52]=_DAY_OFF;
shift.D[52]=_DAY_OFF;
// 8-5. FRI
shift.C[53]=_START_NIGHT_SHIFT;
shift.D[53]=_DAY_OFF;
// 8-6. SAT
shift.C[54]=_NIGHT_SHIFT;
shift.D[54]=_DAY_SHIFT;
// 8-7. SUN
shift.C[55]=_NIGHT_SHIFT;
shift.D[55]=_DAY_SHIFT;

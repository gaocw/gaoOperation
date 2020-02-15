;(function () {
    var gaoOperation = {

        /**
         * 原地交换函数，而非用临时数组
         * @param array
         * @param a
         * @param b
         */
        swap: function (array, a, b) {
            [array[a], array[b]] = [array[b], array[a]];
        },

        /**
         * 划分操作函数
         * @param array
         * @param left
         * @param right
         * @returns {*}
         */
        partition: function (array, left, right) {
            // 用index取中间值而非splice
            const pivot = array[Math.floor((right + left) / 2)];
            var i = left;
            var j = right;

            while (i <= j) {
                while (this.compare(array[i], pivot) === -1) {
                    i++;
                }
                while (this.compare(array[j], pivot) === 1) {
                    j--;
                }
                if (i <= j) {
                    this.swap(array, i, j);
                    i++;
                    j--;
                }
            }
            return i;
        },

        /**
         * 比较函数
         * @param a
         * @param b
         * @returns {number}
         */
        compare: function (a, b) {
            if (a === b) {
                return 0;
            }
            return a > b ? -1 : 1;
        },

        /**
         * 排序主题函数逻辑
         * @param array
         * @param left
         * @param right
         * @returns {*}
         */
        quick: function (array, left, right) {
            var index;
            if (array.length > 1) {
                index = this.partition(array, left, right);
                if (left < index - 1) {
                    this.quick(array, left, index - 1);
                }
                if (index < right) {
                    this.quick(array, index, right);
                }
            }
            return array;
        },

        /**
         * 排序
         * @param array
         * @returns {*}
         */
        quickSort: function(array){
            return this.quick(array, 0, array.length - 1);
        },

        /**
         * 获取小数点后最多的位数
         * @param num or array
         * @returns {number}
         */
        decimalLength: function (num) {
            if (typeof (num) == 'number') {
                var numArr = num.toString().split(".");
                if (numArr[1]) {
                    return numArr[1].length
                } else {
                    return 0;
                }
            } else if (typeof (num) == 'string') {
                var numArr = num.toString().split(".");
                if (numArr[2]) {
                    throw new Error("有数据存在多个小数点！！！");
                } else if (numArr[1]) {
                    return numArr[1].length
                } else {
                    return 0;
                }
            } else if (Array.isArray(num)) {
                var lenArr = [];
                var th = this;
                num.forEach(function (v) {
                    lenArr.push(th.decimalLength(v));
                });
                return th.quickSort(lenArr)[0];
            }
        },

        /**
         * 指数运算
         * @param indexNum  -- 只接受整数
         * @param baseNum
         * @returns {number}
         */
        exponent:function (indexNum,baseNum) {
            baseNum = baseNum ? baseNum : 10 ;
            var reNum = 1;
            if(indexNum == 0){
                return 1;
            }else if(indexNum > 0){
                for(var i =0 ;i < indexNum ; i++){
                    reNum = reNum * baseNum ;
                }
                return reNum;
            }else if(indexNum < 0){
                for(var i =0 ;i < indexNum ; i++){
                    reNum = reNum * baseNum ;
                }
                return 1/reNum;
            }

        },

        /**
         * 求和
         * @param nums
         * @returns {number}
         */
        plus: function (nums) {
            if(Array.isArray(nums)){
                if(nums.length == 0){
                    return null;
                }else if(nums.length == 1){
                    return nums[0]
                }
                var l = this.decimalLength(nums);
                var sum = 0;
                var th = this;
                nums.forEach(function (v) {
                    var numArr = v.toString().split(".");
                    if (numArr[2]) {
                        throw new Error("有数据存在多个小数点！！！");
                    } else if (numArr[1]) {
                        if(numArr[0] == '-0'){
                            sum +=  -1*numArr[1]* th.exponent(l - numArr[1].length);
                        }else if(numArr[0] < 0){
                            sum += numArr[0]*th.exponent(l) - numArr[1]* th.exponent(l - numArr[1].length);
                        }else{
                            sum += numArr[0]*th.exponent(l) + numArr[1]* th.exponent(l - numArr[1].length);
                        }
                    } else {
                        sum += numArr[0]*th.exponent(l)
                    }
                });
                return sum/this.exponent(l);
            }else{
                return nums;
            }

        },

        /**
         * 乘积
         * @param nums
         */
        ride:function (nums) {
            if(Array.isArray(nums)){
                if(nums.length == 0){
                    return null;
                }else if(nums.length == 1){
                    return nums[0]
                }

                var l = this.decimalLength(nums);
                var len = nums.length;
                var rideAll = 1;
                var th = this;
                nums.forEach(function (v) {
                    var numArr = v.toString().split(".");
                    if (numArr[2]) {
                        throw new Error("有数据存在多个小数点！！！");
                    } else if (numArr[1]) {
                        if(numArr[0] == '-0'){
                            rideAll = rideAll * ( -1*numArr[1]* th.exponent(l - numArr[1].length));
                        }else if(numArr[0] < 0){
                            rideAll = rideAll * (numArr[0]*th.exponent(l) - numArr[1]* th.exponent(l - numArr[1].length));
                        }else{
                            rideAll = rideAll * (numArr[0]*th.exponent(l) + numArr[1]* th.exponent(l - numArr[1].length));
                        }
                    } else {
                        rideAll = rideAll * numArr[0]*th.exponent(l)
                    }
                });
                return rideAll/this.exponent(l*len);
            }else{
                return nums;
            }
        },

        except:function () {

        }

    }

    window.gaoOperation = gaoOperation;

})();

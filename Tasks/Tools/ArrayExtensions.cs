using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tools
{
    public static class ArrayExtensions
    {

        public static (Int32, T)[] WithIndex<T>(this IEnumerable<T> sequence)
        {
            return sequence.Select((item, index) => (index, item)).ToArray();
        }
    }
}

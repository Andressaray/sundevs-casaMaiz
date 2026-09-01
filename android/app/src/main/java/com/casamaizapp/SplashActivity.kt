package com.casamaizapp

import android.content.Intent
import android.graphics.Typeface
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Crear layout principal
        val mainLayout = LinearLayout(this).apply {
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT
            )
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setBackgroundColor(ContextCompat.getColor(this@SplashActivity, R.color.splash_background))
        }
        
        // Emoji
        val emojiLabel = TextView(this).apply {
            text = "🌽"
            textSize = 80f
            gravity = Gravity.CENTER
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                setMargins(0, 0, 0, 30)
            }
        }
        mainLayout.addView(emojiLabel)
        
        // App Name (CasaMaiz)
        val appNameLabel = TextView(this).apply {
            text = "CasaMaiz"
            textSize = 40f
            gravity = Gravity.CENTER
            setTextColor(ContextCompat.getColor(this@SplashActivity, R.color.splash_text_primary))
            typeface = Typeface.createFromAsset(assets, "fonts/Poppins-Bold.ttf")
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                setMargins(50, 0, 50, 8)
            }
        }
        mainLayout.addView(appNameLabel)
        
        // Tagline
        val taglineLabel = TextView(this).apply {
            text = "TU CASA, TU COMUNIDAD"
            textSize = 14f
            gravity = Gravity.CENTER
            setTextColor(ContextCompat.getColor(this@SplashActivity, R.color.splash_text_secondary))
            typeface = Typeface.createFromAsset(assets, "fonts/Poppins-Medium.ttf")
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                setMargins(50, 0, 50, 0)
            }
        }
        mainLayout.addView(taglineLabel)
        
        setContentView(mainLayout)
        
        // Navegar a MainActivity después de 2.5 segundos
        Handler(Looper.getMainLooper()).postDelayed({
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }, 2500)
    }
}
